import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { CosmosdbService } from 'src/app/core/services/cosmosdb.service';
import { log } from 'console';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form!: FormGroup;
  firstName!: string;
  lastName!: string;
  displayName!: string;
  expertise!: string;
  certificates!: string;
  website!: string;
  disableSubmit!: boolean;

  constructor(private authService: AuthenticationService,
    private logger: NGXLogger,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
    private cosmosdbService: CosmosdbService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
      expertise: new FormControl('',),
      certificates: new FormControl('',),
      website: new FormControl('',),
    });

    this.form.get('firstName')?.valueChanges
      .subscribe(val => { this.firstName = val; });

    this.form.get('lastName')?.valueChanges
      .subscribe(val => { this.lastName = val; });

    this.form.get('displayName')?.valueChanges
      .subscribe(val => { this.displayName = val; });
    
    this.form.get('expertise')?.valueChanges
      .subscribe(val => { this.expertise = val; });
    
    this.form.get('certificates')?.valueChanges
      .subscribe(val => { this.certificates = val; });
    
    this.form.get('website')?.valueChanges
      .subscribe(val => { this.website = val; });

    this.spinnerService.visibility.subscribe((value) => {
      this.disableSubmit = value;
    });
  }

  saveProfile () {
    const { firstName, lastName, displayName, expertise, certificates, website }= this.form.value;
    const itemBody = {
      firstName, lastName, displayName, expertise, certificates, website,
      id: 'f2067706-d6ff-41af-b09c-b88d5499ca34',
    }
    console.log("updated Member in CosmosDB", itemBody);
    this.cosmosdbService.replaceMemberItem(itemBody);
   
  }
  
}

// this.cosmosdbService.createMemberItem(this.form.value);
// console.log("created new Member in CosmosDB",this.form.value);