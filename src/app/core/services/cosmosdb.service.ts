import { Injectable } from '@angular/core';
import { CosmosClient } from '@azure/cosmos';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CosmosdbService {
  private client: CosmosClient;
  containerId = environment.COSMOSDB_CONTAINER_ID;
  databaseId = environment.COSMOSDB_ID;
  allMembers: any[] = [];
  
  constructor () {
    this.client = new CosmosClient({ endpoint: environment.COSMOSDB_ENDPOINT, key: environment.COSMOSDB_KEY });
  }


  /**
 * Create family item if it does not exist
 */
  async createMemberItem (itemBody: any) {
    const { item } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .items.upsert(itemBody)
    console.log(`Created member item with id:\n${itemBody.id}\n${item.container}\n`)
    console.log(`Created member item with container:\n${itemBody.id}\n${item}\n`)
  }


  async getMemberItem (id: string) {
    const { resource: result } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .item(id)
      .read()
    console.log(`Reading item with result:\n${JSON.stringify(result, null, 2)}\n`);
  }

  async getAllMemberItems () {
    const querySpec = {
      query: 'SELECT * FROM c', // Fetch all documents in the container
    };

    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .items.query(querySpec)
      .fetchAll();
    // console.log(`Reading item with result:\n${JSON.stringify(results, null, 2)}\n`);
    return results;
  }

/**
 * Replace the item by ID.
 */
async replaceMemberItem(itemBody: { value?: any; id: any; children?: any; partitionKey?: any; }) {
  console.log(`Replacing item:\n${itemBody.id}\n`)

  const { item } = await this.client
    .database(this.databaseId)
    .container(this.containerId)
    .item(itemBody.id)
    .replace(itemBody)
}

  /**
   * Query the container using SQL
   */
  async queryContainer () {
    console.log(`Querying container:\n${this.containerId}`)

    // query to return all children in a family
    // Including the partition key value of country in the WHERE filter results in a more efficient query
    const querySpec = {
      query: 'SELECT VALUE r.children FROM root r WHERE r.partitionKey = @country',
      parameters: [
        {
          name: '@country',
          value: 'Germany'
        }
      ]
    }

    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .items.query(querySpec)
      .fetchAll()
    for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult)
      console.log(`\tQuery returned ${resultString}\n`)
    }
  }

}
