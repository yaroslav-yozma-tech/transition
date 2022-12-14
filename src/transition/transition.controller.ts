import { Controller, Get, Query } from '@nestjs/common';
import { TransitionService } from './transition.service';
import { StatusDto } from './dto/status.dto';
import { PathDto } from './dto/path.dto';
import { RouteResponse } from './response/route.response';
import { DestinationResponse } from './response/destination.response';

@Controller()
export class TransitionController {
  constructor(private readonly transitionService: TransitionService) {}

  @Get('/destination')
  getStatusByTransition(@Query() data: StatusDto): Promise<DestinationResponse> {
    return this.transitionService.getDestination(data);
  }

  @Get('/route')
  getRouteForStatus(@Query() data: PathDto): Promise<RouteResponse[]> {
    return this.transitionService.getRoutes(data);
  }
}
