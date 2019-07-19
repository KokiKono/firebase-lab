# native setting

## typescript

```
npm install typescript @types/react @types/react-native --save-dev
touch tsconfig.json
```

### copy to tsconfig.json

```json
{
  "compilerOptions": {
    // Target latest version of ECMAScript.
    "target": "esnext",
    // Search under node_modules for non-relative imports.
    "moduleResolution": "node",
    // Process & infer types from .js files.
    "allowJs": true,
    // Don't emit; allow Babel to transform files.
    "noEmit": true,
    // Enable strictest settings like strictNullChecks & noImplicitAny.
    "strict": true,
    // Disallow features that require cross-file information for emit.
    "isolatedModules": true,
    // Import non-ES modules as default imports.
    "esModuleInterop": true
  },
  "include": [
    "src"
  ]
}
```

```
mkdir src
mv App.js src/App.tsx
```

## install react-native-firebase
https://invertase.io/oss/react-native-firebase/v6/auth/ios
```
npm i -S @react-native-firebase/app
npm i -S @react-native-firebase/auth
```
### add ios/Podfile
```
pod 'RNFBAuth', :path => '../node_modules/@react-native-firebase/auth/ios'
```

### pod install

```
pod update & pod install
react-native link
```

### setting firebase project
1. https://console.firebase.google.com/u/0/?hl=ja&pli=1
からプロジェクトの作成をする
1. GoogleService-Info.plistをxcodeプロジェクトに追加する
2. Google Sing In
   1. ```npm i -S react-native-google-signin```
   2. ```react-native link react-native-google-signin```
   3. ```cd ios & pod update```

### Firebase Authの実装
git commit id: f1422c8を参照

## その他 nativeの設定

### configセットアップ

```
cp .env.sample .env
```

### WEB_CLIENT_IDの設定
FirebaseコンソールからWEB_CLIENT_IDを取得して設定

### 'GeneratedDotEnv.m' file not found
PodFileの末尾にこれを追加したら行けた
https://github.com/luggit/react-native-config/issues/187#issuecomment-468730417
```
post_install do |installer|
  installer.pods_project.targets.each do |target|
    targets_to_ignore = %w(React)

    if targets_to_ignore.include? target.name
      target.remove_from_project
    end

    if target.name == 'react-native-config'
      phase = target.project.new(Xcodeproj::Project::Object::PBXShellScriptBuildPhase)
      phase.shell_script = "cd ../../"\
                           " && RNC_ROOT=./node_modules/react-native-config/"\
                           " && export SYMROOT=$RNC_ROOT/ios/ReactNativeConfig"\
                           " && export BUILD_DIR=$RNC_ROOT/ios/ReactNativeConfig"\
                           " && ruby $RNC_ROOT/ios/ReactNativeConfig/BuildDotenvConfig.ruby"

      target.build_phases << phase
      target.build_phases.move(phase,0)
    end
  end
end
```