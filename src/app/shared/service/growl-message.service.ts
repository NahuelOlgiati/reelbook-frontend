import { Observable, Observer} from 'rxjs/Rx';
import { Message } from 'primeng/primeng';

export class GrowlMessageService {
  private messageObservable: Observable<Message[]>;
  private messageObserver: Observer<Message[]>;

  constructor() {
    this.messageObservable = Observable.create((observer: Observer<Message[]>) => {
      this.messageObserver = observer;
    }).share();
  }

  notifyError(error: Message[]) {
    this.messageObserver.next(error);
  }

  onError(callback: (err: Message[]) => void) {
    this.messageObservable.subscribe(callback);
  }
}