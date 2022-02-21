import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../proposal.service';
import { Workbook } from 'exceljs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FileSaverService } from "ngx-filesaver";
import { ToastrService } from 'ngx-toastr';

declare var $: any;
//import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user_name:any;
  public password:any;
  public remember;
  public forgot_email:any;
  public showPage;
    constructor(private router:Router,private spinner: NgxSpinnerService,private proposalService:ProposalService,private _FileSaverService: FileSaverService,private toastr: ToastrService) { 
    this.showPage='Signin';
    this.user_name=atob(this.getCookie("name1"));
    this.password=atob(this.getCookie("name2"));
    if(atob(this.getCookie("remember"))=='yes')
    {
        this.remember='yes'
    }else
    {
        this.remember='no';
    }
    
    // this.proposalService.Login().subscribe(
    //     (data: any)=> { 
         
    //     });
       
  }
  
  ngOnInit(): void {

  }

  forgot_password()
  {
      this.showPage='Reset';
  }
//   signin()
// {
//   this.router.navigateByUrl('/list')
// }

getCookie(cname:any)
    {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    sign_in()
    {
        if(this.user_name=='' || this.user_name==undefined)
        {
            alert("Please enter email id");
        }
        else if(this.password=='' || this.password==undefined)
        {
            alert("Please enter password");
        }
        else
        {
            var _th=this;
            _th.proposalService.loginUser(_th.user_name,_th.password).subscribe(
                (data: any)=> {
                    if(data.msg=='Success')
                    {
                        sessionStorage.setItem('token',data.token);
                        if($("#remember").prop('checked') == true)
                        {
                            document.cookie = "name1="+btoa(_th.user_name)+";expires=Thu, 31 Dec 2022 12:00:00 UTC";
                            document.cookie = "name2="+btoa(_th.password)+";expires=Thu, 31 Dec 2022 12:00:00 UTC";
                            document.cookie = "remember="+btoa('yes')+";expires=Thu, 31 Dec 2022 12:00:00 UTC";
                        }
                        else
                        {
                            document.cookie = "name1=;expires=Thu, 04 Apr 2019 12:00:00 UTC";
                            document.cookie = "name2=;expires=Thu, 04 Apr 2019 12:00:00 UTC";
                            document.cookie = "remember=;expires=Thu, 04 Apr 2019 12:00:00 UTC";
                        }
                       
                        _th.router.navigateByUrl('/page')

                    }
                    else
                    {
                        alert(data.msg);
                    }
            });
        }
       
    }

    resetPassword()
    {
        if(this.forgot_email=='' || this.forgot_email==undefined)
        {
            alert('Please enter your mail id');
        }
        else
        {
        this.proposalService.resetPassword(this.forgot_email).subscribe(
            (data: any)=> {
            if(data=='not exist')
            {
                alert('Invalid Email id');
            }
            else
            {
                alert('Password is successfully reset');
                this.forgot_email='';
            }
        });
        }
    }
  

 

 
 

}

