import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


 // @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
        console.log("test");
        //$("#wrapper").toggleClass("toggled");
    }

  public toggleMenu: any;
  public SiderbarCollapse: any;
  constructor() { }

  ngOnInit() {

    this.toggleMenu = function(e){
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    }

    // Collapse click
    $('[data-toggle=sidebar-colapse]').click( (e) => {
      this.SiderbarCollapse(e);
    });

    this.SiderbarCollapse = function(e){
        e.preventDefault();
        $("main").toggleClass("iconactive");
        $("#sidebar-wrapper").toggleClass("icontoggled");
        
        $('.menu-collapsed').toggleClass('d-none');
        $('.sidebar-submenu').toggleClass('d-none');
        $('.submenu-icon').toggleClass('d-none');
        $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
        
        // Treating d-flex/d-none on separators with title
        var SeparatorTitle = $('.sidebar-separator-title');
        if ( SeparatorTitle.hasClass('d-flex') ) {
            SeparatorTitle.removeClass('d-flex');
        } else {
            SeparatorTitle.addClass('d-flex');
        }
        
        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
   
    }

  }

}

