import * as firebase from 'firebase';

export interface Credential {
    projectId: string;
    apiKey: string;
}

export abstract class ABFirebase {
    private _fbuser?: firebase.User;

    protected constructor(credential: Credential) {
        firebase.initializeApp(credential);
    }
    abstract authFirebase(): Promise<firebase.auth.UserCredential>;

    private set fbuser(user: firebase.User | undefined) {
        this._fbuser = user;
    }

    private get fbuser(): firebase.User | undefined {
        return this._fbuser;
    }

    public get user(): firebase.User {
        if (this.fbuser == null) throw new Error(`should be call createExtendsInstance()`);
        return this.fbuser;
    }

    public static async createExtendsInstance<T extends ABFirebase>(WrapClass: {new (credential: Credential): T}, credential: Credential): Promise<T> {
        const instance = new WrapClass(credential);
        firebase.auth().onAuthStateChanged((user) => {
            if (user == null) return;
            instance.fbuser = user;
        });
        await instance.authFirebase();
        return instance;
    }
}


