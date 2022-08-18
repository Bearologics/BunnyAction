import fetch from "node-fetch";
import { info } from "@actions/core";

function dangerouslyDeleteAllExistingData(
  storageName: string,
  accessKey: string
) {
  return fetch(`https://storage.bunnycdn.com/${storageName}/`, {
    method: "GET",
    headers: {
      AccessKey: accessKey,
    },
  }).then((response) => {
    if (response.status === 200) {
      info(`Cache purged`);
    } else if (response.status === 401) {
      info(`Auth failed`);
    } else if (response.status === 404) {
      info(`Invalid zoneId`);
    } else {
      throw new Error(`Error purging cache ${response.status}.`);
    }
    return response;
  });
}

export default async function run(
  storageName: string,
  accessKey: string
): Promise<void> {
  await dangerouslyDeleteAllExistingData(storageName, accessKey);
}
