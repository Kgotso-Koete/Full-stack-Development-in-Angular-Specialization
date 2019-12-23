# ConFusion

This project was generated with ionic 3

1. Node: 8.11.3
2. Ionic: 3.20.1
3. Cordova: 9.0.0
4. Angular CLI: 8.3.18
5. Angular: 5.2.11
6. json-server: 0.15.1

## How to run

If any of you are struggling to install Ionic and create your first app, I thought I might give you a few tips on which steps worked for me

1. Install node@8.11.3 using the nvm and then ensure it nvm uses node@8.11.3: `nvm use 8.11.3`
2. Install ionic@3.20.1 and Cordova@9.0.0: `sudo npm -g install ionic@3.20.1 cordova`
3. Create the app: `sudo ionic start conFusion sidemenu --unsafe-perm` , [I added the permission commands because my system would not let me make changes to the folder]
4. Once you cd into the conFusion folder, be sure that you have/recursively add Linux permissions to create, edit and delete files in the conFusion folder otherwise you can't install missing packages with npm: `sudo find foldername -exec chmod a+rwx {} ";"`
5. Install missing packages: `sudo npm install --unsafe-perm`
6. Create a local json database server: `json-server --host 192.168.X.X --watch db.json -d 2000`
7. Serve your app: `sudo ionic serve --lab –unsafe-perm`, [permissions are important here too because it initially would not let me built certain files before serving]
8. Open local host in your browser to see the app: `http://192.168.X.X:8100/ionic-lab`

## Building for Android

I struggled to create $ANDROID_HOME and $JAVA_HOME paths so I just added them to the Ionic commands below

1. Add Android platform: `sudo ionic cordova platform add android`
2. Build for android: `sudo ANDROID_HOME=/path to android from home/Android/Sdk ANDROID_SDK_ROOT=/path to android from home/Android/Sdk JAVA_HOME=/path to java jvm/jvm/jdk1.8.0_231 ionic cordova build android`
3. Package for real Android device: `sudo ANDROID_HOME=/path to android from home/Android/Sdk ANDROID_SDK_ROOT=/path to android from home/Android/Sdk JAVA_HOME=/path to java jvm/jvm/jdk1.8.0_231 ionic cordova run android --device -l --ssl --debug`
4. Package and start on Android emulator (via Android Studio: `sudo ANDROID_HOME=/path to android from home/Android/Sdk ANDROID_SDK_ROOT=/path to android from home/Android/Sdk JAVA_HOME=/path to java jvm/jvm/jdk1.8.0_231 ionic cordova emulate android --device -l --ssl –debug`
