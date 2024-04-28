import { Body, Controller, Get } from "routing-controllers";


@Controller("/test")
export class TestController {
    @Get("/")
    async testServer(@Body({ required: false }) request: any){
        return { status: 'success', message: 'test con' };
    }
}
