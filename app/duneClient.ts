import { DuneClient, QueryParameter } from '@cowprotocol/ts-dune-client';
import { DUNE_QUERY_ID, DUNE_API_KEY } from './config';

type StanRecord = {
  stan_rank: number
  username: string
  display_name: string
  comments_from: number
  likes_from: number
  recasts_from: number
}

export default async function runStanQuery(username: string, numResults: number = 5) {
    const client = new DuneClient(DUNE_API_KEY ?? "");
    const parameters = [
      QueryParameter.text('user_input_fname', username),
      QueryParameter.number('num_results_to_return', numResults),
    ];
    let response = await client.refresh(DUNE_QUERY_ID, parameters);
    return response.result?.rows as StanRecord[];
};
