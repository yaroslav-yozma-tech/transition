import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { StatusDto } from './dto/status.dto';
import { ActionEnum } from './enum/action.enum';
import { RuleEnum } from './enum/rule.enum';
import { TypeEnum } from './enum/type.enum';
import { TransitionRepository } from './transition.repository';
import { PathDto } from './dto/path.dto';
import { RouteResponse } from './response/route.response';
import { DestinationResponse } from './response/destination.response';

@Injectable()
export class TransitionService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private repository: TransitionRepository
  ) {}

  async getDestination(data: StatusDto): Promise<DestinationResponse> {
    const action = ActionEnum[data.action];
    const rule = RuleEnum[data.rule];
    const type = TypeEnum[data.type];

    const destination = await this.repository.getStatusByPath(action, rule, type);

    return {
      message: `The next status is: ${destination.status}`,
    };
  }

  async getRoutes(data: PathDto): Promise<RouteResponse[]> {
    const action = ActionEnum[data.action];
    const rule = RuleEnum[data.rule];
    const type = TypeEnum[data.type];

    const start = (await this.repository.getStatusByPath(action, rule, type)).status;

    const routes = [];
    for (const destination of data.status) {
      const path = await this.repository.getRouteToStatus(start, destination);

      routes.push({
        start: start,
        destination: destination,
        path: path,
      });
    }

    return routes;
  }
}
