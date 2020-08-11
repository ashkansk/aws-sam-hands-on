package com.arkasoft.awssamhandson.firstlambda;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.GetItemRequest;

import java.util.HashMap;
import java.util.Map;

public class MyService {
  private final AmazonDynamoDB ddb = AmazonDynamoDBClientBuilder.defaultClient();

  public String getName(String id) {
    HashMap<String, AttributeValue> keyToGet =
        new HashMap<>();

    keyToGet.put("id", new AttributeValue(id));
    GetItemRequest request = new GetItemRequest()
        .withKey(keyToGet)
        .withTableName("sam-handson");
    try {
      Map<String, AttributeValue> returnedItem =
          ddb.getItem(request).getItem();
      if (returnedItem != null)
        return returnedItem.get("name").getS();
      else {
        System.out.format("No item found with the id %s!\n", id);
        return "";
      }
    } catch (
        AmazonServiceException e) {
      System.err.println(e.getErrorMessage());
      return "Error occurred!";
    }
  }

}
