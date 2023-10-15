import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CosmosdbService } from 'src/app/core/services/cosmosdb.service';
import { MemberTemplate } from 'src/app/models/member.class';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})

export class MembersListComponent implements OnInit {
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  $members: Observable<MemberTemplate[]> | undefined; // Use an Observable

  newMember: MemberTemplate[] = [
    { displayName: "Spiderman", firstName: "Peter", lastName: 'Parker', expertise: "Hero", certificates: 'Spider Power', website: 'https://www.spider.com' },
  ];

  displayedColumns: string[] = ['displayname', 'fullname', 'expertise', 'certificates', 'website'];
  dataSource = new MatTableDataSource<MemberTemplate>([]);

  constructor (
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private cosmosdbService: CosmosdbService
  ) { }

  ngOnInit () {
    this.titleService.setTitle('AI Expert Community - Members');
    this.logger.log('Members loaded');
    this.notificationService.openSnackBar('Members loaded');
    this.dataSource.sort = this.sort;
    this.$members = this.getMemberData(); // Assign the Observable here
    this.$members?.subscribe(data => {
      this.dataSource.data = data;
    });
    

  }

  getMemberData (): Observable<MemberTemplate[]> {
    return from(this.cosmosdbService.getAllMemberItems());
  }

  createNewMember () {
    this.cosmosdbService.createMemberItem(
      { displayName: "Wonder Woman", firstName: "Diana", lastName: 'of Themyscira', expertise: "Strength and Truth", certificates: 'Amazon Power', website: 'https://www.outerplanet.com' },
    );
  }
  
}