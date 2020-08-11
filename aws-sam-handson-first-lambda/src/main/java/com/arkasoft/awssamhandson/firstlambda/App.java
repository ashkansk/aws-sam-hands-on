package com.arkasoft.awssamhandson.firstlambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

import java.util.HashMap;
import java.util.Map;

/**
 * Handler for requests to Lambda function.
 */
public class App implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

  public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent input, final Context context) {
    var service = new MyService();
    try {
      String output = String.format("{ \"message\": \"hello world from FIRST lambda\", \"name\": \"%s\" }",
          service.getName("lksjdf83lksdf20asdfb9"));
      return createResponse(output, 200);
    } catch (Exception e) {
      return createResponse("{}", 500);
    }
  }

  private APIGatewayProxyResponseEvent createResponse(String body, int statusCode) {
    Map<String, String> headers = new HashMap<>();
    headers.put("Content-Type", "application/json");
    headers.put("X-Custom-Header", "application/json");

    APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent()
        .withHeaders(headers);
    return response
        .withStatusCode(statusCode)
        .withBody(body);
  }
}

