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
      info(`Existing data deleted successfully`);
    } else {
      throw new Error(`Error deleting existing data ${response.status}.`);
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
