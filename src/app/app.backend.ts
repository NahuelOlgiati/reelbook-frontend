
import { NgModule, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
declare var jQuery: any;
const jsonHeader = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json'}) });
const xwwwformurlencodedHeader = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}) });
const formdataHeader = new RequestOptions({ headers: new Headers({ 'Content-Type': 'multipart/form-data'}) });

export interface BaseModel extends Manageable, Validable, Describable, Serializable {
    id: number;
}

export interface BaseParentSimpleModel<T> extends BaseSimpleModel {
    parent: T;
}

export interface BaseRevisionModel extends Serializable {
    id: number;
    date: Date;
    userName: string;
}

export interface BaseSimpleModel extends BaseModel {
    description: string;
}

export interface BaseSummarySimpleModel extends BaseSimpleModel {
    summaryDescription: string;
}

export interface BundleKeyValue extends Serializable {
    key: string;
    value: string;
}

export interface Revision extends BaseRevisionModel {
}

export interface Clonable<T> {
    clone: T;
}

export interface Describable {
    fullDescription: string;
}

export interface Emptiable {
    blank: boolean;
}

export interface Labeled {
    label: string;
}

export interface LabeledValued<T> extends Labeled, Valued<T> {
}

export interface Manageable {
    persisted: boolean;
    new: boolean;
}

export interface Selectable {
    selectable: boolean;
}

export interface Validable {
}

export interface Valued<T> {
    value: T;
}

export interface MessageResponse {
    severity: string;
    summary: string;
    detail: string;
}

export interface ModelResponse<T> {
    success: boolean;
    model: T;
}

export interface PagedModelResponse<T> {
    success: boolean;
    rowCount: number;
    queryList: T[];
}

export interface Artist extends BaseSimpleModel {
    artistID: number;
    country: Country;
    userID: number;
    file: File;
}

export interface AudioVisual extends BaseModel {
    audiovisualID: number;
    userID: number;
    video: Video;
}

export interface City extends BaseSimpleModel {
    cityID: number;
    district: District;
}

export interface Country extends BaseSummarySimpleModel {
    countryID: number;
}

export interface District extends BaseSummarySimpleModel {
    districtID: number;
    state: State;
}

export interface DocumentType extends BaseSummarySimpleModel {
    documentTypeID: number;
    country: Country;
    format: string;
}

export interface DriveCredential extends BaseModel {
    driveCredentialID: number;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface File extends BaseModel {
    fileID: number;
    fileName: string;
    content: string;
}

export interface MaritalStatus extends BaseSimpleModel {
    maritalStatusID: number;
}

export interface NaturalTaxPayer extends TaxPayer {
    firstName: string;
    lastName: string;
    maternalLastName: string;
    gender: GenderEnum;
    birthDate: Date;
    maritalStatus: MaritalStatus;
    secondaryDocument: Document;
    naturalTaxPayerCategory: NaturalTaxPayerCategory;
}

export interface NaturalTaxPayerCategory extends TaxAgentClassification {
    taxAgentClassificationID: number;
}

export interface OauthCredential extends BaseModel {
    oauthCredentialID: number;
    user: User;
    youtubeAccessToken: string;
    youtubeRefreshToken: string;
    driveAccessToken: string;
    driveRefreshToken: string;
}

export interface Permit extends BaseSimpleModel {
    permitID: number;
    module: string;
    code: string;
}

export interface Profile extends BaseModel {
    profileID: number;
    groupName: string;
    permits: Permit[];
}

export interface RestSession extends BaseModel {
    restSessionID: number;
    user: User;
    lastAccess: Date;
    token: string;
    agent: string;
    IP: string;
    expires: boolean;
}

export interface State extends BaseSummarySimpleModel {
    stateID: number;
    country: Country;
}

export interface Street extends BaseSimpleModel {
    streetID: number;
    city: City;
}

export interface SystemAgent extends Agent {
    agentID: number;
    firstName: string;
    lastName: string;
}

export interface TaxPayer extends TaxAgent<TaxPayerPhone, TaxPayerContact> {
    agentID: number;
    phoneList: TaxPayerPhone[];
    phoneDefault: TaxPayerPhone;
    contactList: TaxPayerContact[];
    contactDefault: TaxPayerContact;
}

export interface TaxPayerContact extends TaxAgentContact {
    taxAgentContactID: number;
    taxPayer: TaxPayer;
}

export interface TaxPayerPhone extends TaxAgentPhone {
    taxAgentPhoneID: number;
    taxPayer: TaxPayer;
}

export interface User extends BaseModel {
    userID: number;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    artistID: number;
    audioVisualID: number;
    oauthCredential: OauthCredential;
    validated: boolean;
    active: boolean;
    profiles: Profile[];
}

export interface Video extends BaseModel {
    videoID: number;
    fileName: string;
    content: any;
    oID: number;
}

export interface Zone extends BaseSimpleModel {
    zoneID: number;
    city: City;
}

export interface DriveFile {
    driveFileID: string;
    name: string;
    mimeType: string;
}

export interface OauthTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;
}

export interface YoutubeVideo {
    videoID: string;
    title: string;
    thumbnailURL: string;
}

export interface Address extends Validable, Emptiable, Describable, Serializable {
    addStreet: Street;
    addNumber: number;
    addFloor: string;
    addApartment: string;
    addZipCode: string;
    addStreet1: Street;
    addStreet2: Street;
    zone: Zone;
    residenceName: string;
    addNotes: string;
    description: string;
}

export interface Contact extends Validable, Describable, Serializable {
    contactType: ContactTypeEnum;
    contact: string;
    notes: string;
}

export interface Document extends Validable, Emptiable, Serializable {
    documentType: DocumentType;
    documentNumber: string;
    typeNumberDocument: string;
}

export interface Phone extends Validable, Emptiable, Describable, Serializable {
    phoneType: PhoneTypeEnum;
    phoneCountryCode: string;
    phoneCountryArea: string;
    phoneNumber: string;
}

export interface Agent extends BaseModel {
    document: Document;
}

export interface TaxAgent<P, C> extends Agent {
    country: Country;
    legalAddress: Address;
    notes: string;
    phoneList: P[];
    phoneDefault: P;
    contactList: C[];
    contactDefault: C;
}

export interface TaxAgentClassification extends BaseSummarySimpleModel {
}

export interface TaxAgentContact extends BaseModel {
    contact: Contact;
}

export interface TaxAgentPhone extends BaseModel {
    phone: Phone;
}

export interface Serializable {
}

export interface MultipartFormDataInput extends MultipartInput {
    formDataMap: { [index: string]: InputPart[] };
    formData: { [index: string]: InputPart };
}

export interface InputPart {
    headers: any;
    mediaType: MediaType;
    bodyAsString: string;
    contentTypeFromMessage: boolean;
}

export interface MultipartInput {
    parts: InputPart[];
    preamble: string;
}

export interface MediaType {
    type: string;
    subtype: string;
    parameters: { [index: string]: string };
    wildcardType: boolean;
    wildcardSubtype: boolean;
}

@Injectable()
export class ArtistService {

    constructor(private http: Http) {
    }

    create(arg0: Artist): Observable<any> {
        return this.http.post('rest/artist', arg0, jsonHeader );
    }

    current(): Observable<any> {
        return this.http.get('rest/artist/current');
    }

    delete(id: number): Observable<any> {
        return this.http.delete('rest/artist/' + id);
    }

    get(id: number): Observable<any> {
        return this.http.get('rest/artist/get:' + id);
    }

    getList(): Observable<any> {
        return this.http.get('rest/artist');
    }

    pagedlist(description: string, queryParams?: { firstResult?: number; maxResults?: number; }): Observable<any> {
        return this.http.get('rest/artist/pagedlist:' + description + '?' + jQuery.param(queryParams));
    }

    update(arg0: Artist): Observable<any> {
        return this.http.put('rest/artist', arg0, jsonHeader );
    }

    uploadFile(arg0: MultipartFormDataInput): Observable<any> {
        return this.http.post('rest/artist/submit', arg0, formdataHeader );
    }

    withtags(queryParams?: { firstResult?: number; maxResults?: number; tag?: string[]; }): Observable<any> {
        return this.http.get('rest/artist/withtags' + '?' + jQuery.param(queryParams));
    }
}

@Injectable()
export class AudioVisualService {

    constructor(private http: Http) {
    }

    create(arg0: AudioVisual): Observable<any> {
        return this.http.post('rest/audiovisual', arg0, jsonHeader );
    }

    delete(id: number): Observable<any> {
        return this.http.delete('rest/audiovisual/' + id);
    }

    get(id: number): Observable<any> {
        return this.http.get('rest/audiovisual/get:' + id);
    }

    update(arg0: AudioVisual): Observable<any> {
        return this.http.put('rest/audiovisual', arg0, jsonHeader );
    }

    uploadFile(arg0: MultipartFormDataInput): Observable<any> {
        return this.http.post('rest/audiovisual/submit', arg0, formdataHeader );
    }
}

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
    }

    signin(formParams?: { userName?: string; password?: string; }): Observable<any> {
        return this.http.post('rest/authentication/signin', jQuery.param(formParams), xwwwformurlencodedHeader );
    }

    signup(formParams?: { userName?: string; firstName?: string; lastName?: string; email?: string; password?: string; }): Observable<any> {
        return this.http.post('rest/authentication/signup', jQuery.param(formParams), xwwwformurlencodedHeader );
    }
}

@Injectable()
export class DriveService {

    constructor(private http: Http) {
    }

    getUserFiles(): Observable<any> {
        return this.http.get('rest/drive/userFiles', jsonHeader );
    }
}

@Injectable()
export class OauthService {

    constructor(private http: Http) {
    }

    hasDriveCredential(): Observable<any> {
        return this.http.get('rest/oauth/credential/drive/has', jsonHeader );
    }

    hasYoutubeCredential(): Observable<any> {
        return this.http.get('rest/oauth/credential/youtube/has', jsonHeader );
    }

    saveDriveCredential(formParams?: { authCode?: string; redirectUri?: string; }): Observable<any> {
        return this.http.post('rest/oauth/credential/drive/save', jQuery.param(formParams), xwwwformurlencodedHeader );
    }

    saveYoutubeCredential(formParams?: { authCode?: string; redirectUri?: string; }): Observable<any> {
        return this.http.post('rest/oauth/credential/youtube/save', jQuery.param(formParams), xwwwformurlencodedHeader );
    }
}

@Injectable()
export class RestSessionService {

    constructor(private http: Http) {
    }

    getSession(): Observable<any> {
        return this.http.get('rest/session', jsonHeader );
    }

    getUser(formParams?: { token?: string; }): Observable<any> {
        return this.http.post('rest/session/user', jQuery.param(formParams), xwwwformurlencodedHeader );
    }

    refreshUser(formParams?: { token?: string; }): Observable<any> {
        return this.http.post('rest/session/refreshuser', jQuery.param(formParams), xwwwformurlencodedHeader );
    }
}

@Injectable()
export class TestService {

    constructor(private http: Http) {
    }

    cleardbmsg(): Observable<any> {
        return this.http.get('rest/test/reloaddbmsg');
    }

    ip(): Observable<any> {
        return this.http.get('rest/test/ip');
    }

    model(): Observable<any> {
        return this.http.get('rest/test/model');
    }

    streamVideo(): Observable<any> {
        return this.http.get('rest/test/mp4');
    }

    validation(): Observable<any> {
        return this.http.get('rest/test/validation');
    }
}

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    create(arg0: User): Observable<any> {
        return this.http.post('rest/user', arg0, jsonHeader );
    }

    delete(id: number): Observable<any> {
        return this.http.delete('rest/user/' + id);
    }

    get(id: number): Observable<any> {
        return this.http.get('rest/user/get:' + id);
    }

    getCurrent(): Observable<any> {
        return this.http.get('rest/user/current');
    }

    getList(): Observable<any> {
        return this.http.get('rest/user');
    }

    pagedlist(description: string, queryParams?: { firstResult?: number; maxResults?: number; }): Observable<any> {
        return this.http.get('rest/user/pagedlist:' + description + '?' + jQuery.param(queryParams));
    }

    stream(): Observable<any> {
        return this.http.get('rest/user/stream');
    }

    update(arg0: User): Observable<any> {
        return this.http.put('rest/user', arg0, jsonHeader );
    }
}

@Injectable()
export class YoutubeService {

    constructor(private http: Http) {
    }

    getUserVideos(): Observable<any> {
        return this.http.get('rest/youtube/userVideos', jsonHeader );
    }
}

@NgModule({ providers: [ 
	ArtistService,
	AudioVisualService,
	AuthenticationService,
	DriveService,
	OauthService,
	RestSessionService,
	TestService,
	UserService,
	YoutubeService
 ] })
export class AppBackendModule {
}

export type ContactTypeEnum = 'MAIL' | 'SMS' | 'OTHER';

export type GenderEnum = 'MALE' | 'FEMALE';

export type PhoneTypeEnum = 'HOME' | 'MOBILE' | 'OFFICE' | 'FAX' | 'OTHER';

export type ProfileReservedEnum = 'BASIC' | 'ADMIN' | 'PORTAL';

export type ResponseHeaderEnum = 'REFRESH_SESSION_USER';

export type TaxPayerTypeEnum = 'ALL' | 'NATURAL' | 'LEGAL';
