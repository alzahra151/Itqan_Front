import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidbarComponent } from '../sidbar/sidbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { initFlowbite } from 'flowbite';
import { AssociationService } from '../../../core/services/association/association.service';
import { error } from 'console';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SidebarModule,
    SidbarComponent,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig, @Inject(PLATFORM_ID) private platformId: Object,
    private associationService: AssociationService) { }
  gfg: boolean = false
  assossioson: any
  ngOnInit() {
    this.primengConfig.ripple = true;
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite()
    }


    this.associationService.getAssociation(1).subscribe({
      next: (data) => {
        this.assossioson = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}

