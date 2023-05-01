import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'چت بات';

  messages: MessageModel[] = [];
  messageTypeEnum = MessageTypeEnum;
  form: FormGroup;



  ngOnInit(): void {

    this.initForm();

  }


  constructor(private fb: FormBuilder, private service: ChatService) {

  }


  initForm() {
    this.form = this.fb.group({
      textControl: new FormControl(null)
    })
  }


  sendMessage() {
    const text = this.form.get('textControl')?.value;
    const message = new MessageModel(MessageTypeEnum.sent, text);
    this.messages.push(message);
    this.form.get('textControl')?.setValue('');
    this.service.getResponse(text).subscribe(res => {
      const response = new MessageModel(MessageTypeEnum.recieved, res.result);
      this.messages.push(response);
    })
  }

}




class MessageModel {
  type: MessageTypeEnum;
  value: string;

  constructor(type?: MessageTypeEnum,value?: string) {
    this.type  = type!;
    this.value = value!;
  }
}

enum MessageTypeEnum {
  sent,
  recieved
}
