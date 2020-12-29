import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MailService} from '../../service/mail.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-callback-modal',
  templateUrl: './callback-modal.component.html',
  styleUrls: ['./callback-modal.component.scss']
})
export class CallbackModalComponent implements OnInit, OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  sendStatus = true;
  msg: string;
  callbackForm: FormGroup;

  constructor(
    private mailService: MailService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.callbackForm = new FormGroup({
      phone: new FormControl('', Validators.required),
      commend: new FormControl('', Validators.required)
    });
  }

  successEmail(msg: string) {
    this.msg = msg;
    this.sendStatus = !this.sendStatus;
    setTimeout( () => this.dialog.closeAll(), 3000);
  }
  submit(){
    this.mailService.sendCallback(this.callbackForm.value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        ( mgs: string) => this.successEmail(mgs),
        error => this.successEmail(error)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
