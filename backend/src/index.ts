import {default as startDiscord} from "./discord/app";
import BaseDatabaseWrapper from "./database/wrapper/BaseDatabaseWrapper";

async function starter(){
    await BaseDatabaseWrapper.start();
    await startDiscord();
}

starter().catch(e => console.error(e));