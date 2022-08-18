import fetch from "node-fetch";
import { info } from "@actions/core";

function purgeZone(zoneId: string, accessKey: string) {
  info(`Purging ${`https://api.bunny.net/pullzone/${zoneId}/purgeCache`}`);

  return fetch(`https://api.bunny.net/pullzone/${zoneId}/purgeCache`, {
    method: "POST",
    headers: {
      AccessKey: accessKey,
    },
  }).then((response) => {
    if (response.status === 204) {
      info(`Cache purged`);
    } else if (response.status === 401) {
      throw new Error(`Auth failed`);
    } else if (response.status === 404) {
      throw new Error(`Invalid zoneId`);
    } else {
      throw new Error(`Error purging cache ${response.status}.`);
    }
    return response;
  });
}

export default async function run(
  zoneId: string,
  accessKey: string
): Promise<void> {
  await purgeZone(zoneId, accessKey);
}
