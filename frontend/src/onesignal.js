import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({ appId: 'f4b1c655-573d-4585-a662-d4c9baaa2826'});
  OneSignal.Slidedown.promptPush();
}
