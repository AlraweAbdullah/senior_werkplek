import { database } from '../../../../util/db.server';
import { usersSeed } from './userSeeds';
import { deviceTypesSeed } from './deviceTypeSeeds';

import {questionSeed} from './questionSeed';
import {issueSeed} from './issueSeed';
import {devicesSeed} from './deviceSeed';


async function seedUsers() {
    for (const user of usersSeed) {
        await database.user.create({
            data: user,
        });
    }
    console.log('User seeds are ok ...');
}

async function seedDeviceTypes() {
    for (const deviceType of deviceTypesSeed) {
        await database.deviceType.create({
            data: deviceType,
        });
    }
    console.log('Device type seeds are ok ...');
}

async function seedIssues() {
    for (const issue of issueSeed) {
        await database.issue.create({
            data: issue,
        });
    }
    console.log('Issue seeds are ok ...');
}

async function seedQuestions() {
    for (const question of questionSeed) {
        await database.question.create({
            data: question,
        });
    }
    console.log('Question seeds are ok ...');
}



async function seedDevices() {
    for (const device of devicesSeed){
        await database.device.create({
            data: {
                deviceType_id: device.deviceType_id,
                user_id: device.user_id,
                name: device.name,
            }
        })
    }
    console.log('device seeds are ok ...')
}



async function seedDataBase(){
    await seedUsers();
    await seedDeviceTypes();
    await seedIssues();
    await seedQuestions();
    await seedDevices();

}

seedDataBase()
    .then(async () => {
        await database.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await database.$disconnect();
        process.exit(1);
    });
