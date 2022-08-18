import uploader from "./uploader";
import purge from "./purge";
import deleter from "./delete";

import { getInput, setFailed, info } from "@actions/core";
import { join } from "path";
import { Utils } from "@technote-space/github-action-helper";

async function run() {
  try {
    const source = join(Utils.getWorkspace(), getInput("source"));
    const storageZoneName = getInput("storageZoneName");
    const accessKey = getInput("accessKey");
    const zoneId = getInput("zoneId");
    const zoneKey = getInput("zoneKey");
    const dangerouslyDeleteAllExistingData = getInput(
      "dangerouslyDeleteAllExistingData"
    );

    if (dangerouslyDeleteAllExistingData === "true") {
      await deleter(storageZoneName, accessKey);
    }

    if (storageZoneName && accessKey) {
      info(`Deploying ${source}`);
      await uploader(source, storageZoneName, accessKey);
    }

    if (zoneId && zoneKey) {
      await purge(zoneId, zoneKey);
    }
  } catch (error) {
    setFailed(error);
  }
}

void run();
