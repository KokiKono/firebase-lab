import * as firebase from 'firebase';
import * as sinon from 'sinon';
import { ABFirebase, Credential } from "../";

jest.mock('firebase');

const CREDENTIAL: Credential = {
    projectId: 'sample_project_id',
    apiKey: 'key',
}
const USER = {
    email: 'user@sample.com',
    password: 'password',
}

class TestClass extends ABFirebase {
    constructor(credential: Credential) {
        super(credential);
    }
    async authFirebase() {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(
            USER.email,
            USER.password,
        );
        return userCredential;
    }
}

describe('ABFirebase', () => {
    beforeAll(() => {
        const Mock: jest.Mocked<firebase.app.App> = firebase as any;
        Mock.auth.mockReturnValue({
            ...firebase.auth(),
            onAuthStateChanged: (callback: any) => {
                callback(USER);
                return jest.fn();
            },
            signInWithEmailAndPassword: jest.fn(),
        })
    })
    describe('createExtendsInstance()', () => {
        it('Check logic flow', async () => {
            const spy = {
                initializeApp: jest.spyOn(firebase, 'initializeApp'),
                onAuthStateChanged: jest.spyOn(firebase.auth(), 'onAuthStateChanged'),
                authFirebase: sinon.spy(TestClass.prototype, 'authFirebase'),
            }
            // create instace
            const instance = await ABFirebase.createExtendsInstance(TestClass, CREDENTIAL);
            // 1.call initial app
            expect(spy.initializeApp).toBeCalledWith(CREDENTIAL);
            // 2.called abstract method authFirebase()
            expect(spy.authFirebase.calledOnce).toBeTruthy();
            // 3.called onAuthStateChanged after authFirebase()
            expect(spy.onAuthStateChanged).toHaveBeenCalled();
            // 4. setting user equal USER
            expect(instance.user).toEqual(USER);
        })
    })
})