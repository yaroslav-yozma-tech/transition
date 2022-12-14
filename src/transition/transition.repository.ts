import { BadRequestException, Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class TransitionRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getStatusByPath(action: string, rule: string, type: string): Promise<{ status: number }> {
    try {
      const query = await this.neo4jService.read(
        `MATCH (status:Status) -[r:TRANSITION]-> (destination:Status)
            WHERE r.action = $action AND r.rule = $rule AND r.type = $type
            RETURN destination`,
        { action: action, rule: rule, type: type }
      );
      const { properties } = query.records[0].get('destination');

      return {
        status: Number(properties.value),
      };
    } catch (error) {
      throw new BadRequestException('Path not found');
    }
  }

  async getRouteToStatus(start: number, destination: number): Promise<string[]> {
    try {
      const query = await this.neo4jService.read(
        `MATCH path = allShortestPaths(
             (start:Status {value:$start})
             -[route:TRANSITION*]->
             (destination:Status {value:$destination})
            )
          RETURN route`,
        { start: Number(start), destination: Number(destination) }
      );
      const data = query.records[0].get('route');

      const route = [];
      for (const item of data) {
        const path = item.properties;
        route.push([path.action, path.rule, path.type]);
      }

      return route;
    } catch (error) {
      throw new BadRequestException('Route not found');
    }
  }
}
