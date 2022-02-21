import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FileSaverService } from "ngx-filesaver";
import { ToastrService } from 'ngx-toastr';
import { ProposalService } from '../proposal.service';

import{ jsPDF} from "jspdf"
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent{
  @ViewChild('content',{static:false}) el!:ElementRef
  public currentTab:any;
  public client_name:any;
  public archi_tect:any;
  public project_name:any;
  public location:any;
  public pid:any;
  
  public scope_service:Array<any>=[];
    // stageB2
  public Locate:any;
  public bclt_name:any;
  public barch_name:any;
  public clt_street:any;
  public arch_street:any;
  public clt_poastal:any;
  public arch_poastal:any;
  public clt_telephone:any;
  public arch_telephone:any;
  public clt_represent:any;
  public arch_represent:any;
  public clt_mail:any;
  public arch_mail:any;
  public client_mobile:any;
  public arch_mobile:any;
  public clt_sign:any;
  public arch_sign:any;
  public clt_date:any;
  public arch_date:any;
  public clt_site:any;
  public arch_site:any;
  public clt_probuilding:any;
  public arch_probuilding:any;
  public clt_budget:any;
  public arch_budget:any;
  public clt_month:any;
  public arch_month:any;

  public spcl_cond:any;
  public additional_doc:any;
  public timeSchdule=[{budjet_name:'Architect'},{budjet_name:'Client'},{budjet_name:'Seperate Consultant'},{budjet_name:'PM Consultant'},{budjet_name:'NA'}]
  public parameter_info:Array<any>=[];
  public answerInfo:any={}; 
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private spinner: NgxSpinnerService,private proposalService:ProposalService,private _FileSaverService: FileSaverService,private toastr: ToastrService)
  {
    // this.pid='620395c37cdd443d74502f73';
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pid = atob(params['pid']);  
      this.spinner.show();
    this.proposalService.getInfoValue(this.pid).subscribe(
        (data: any)=> { 
        this.pid=data.pid
        this.project_name=data.project_name;
        this.parameter_info=data.parameter_info;
      });
      console.log(this.parameter_info)
    })
  }

  showTab(value:any)
  {
    if(this.currentTab==value)
    {
      this.currentTab='';
    }
    else
    {
      this.currentTab=value;
    }
  }

  
   makePDF(){
     let pdf=new jsPDF('p','pt','a4');
     pdf.html( this.el.nativeElement,{
       callback:(pdf)=>{
       pdf.save( "save.pdf")
       }
     });
   }


  // save()
  // {
  //   let bulkquery

  //   bulkquery=
  //   {
  //     pid:this.pid,
  //     share_thersholds:this.share_thersholds,
  //   }
  //   console.log(bulkquery)
  //   this.proposalService.service(bulkquery).subscribe(
  //     (data:any)=>{
      
  //     });

  // }

  

  changeShareInfo(pid:any)
  {
      var sdfs = this.parameter_info.findIndex(x => x.budjet_name==pid);
      if(sdfs<0)
      {
        this.parameter_info.push({budjet_name:pid});
      }
      else
      {
        this.parameter_info = this.parameter_info.filter(function(item) { 
            return item.budjet_name !== pid
        });
      }
      this.answerInfo['parameter_info']=this.parameter_info;
  }

  
  // save()
  // {

  //   this.proposalService.saveProjectInfo(this.pid,this.answerInfo).subscribe(
  //       (data: any)=> {
       
  //         this.answerInfo={};
  //         // this.spinner.hide();
  //         this.toastr.success('Saved Successfully!', '');
  //     }); 
  //     console.log(this.answerInfo)
    
  // }
  save()
  {
    this.spinner.show();
   
      this.proposalService.saveCoreProjectInfo(this.pid,this.answerInfo).subscribe(
        (data: any)=> {
          this.answerInfo={};
          this.spinner.hide();
          this.toastr.success('Saved Successfully!', '');
      }); 
   
   
  }

  onSave()
  {
    let bulkquery={
      pid:this.pid,
      client_name:this.client_name,
      archi_tect:this.archi_tect,
      project_name:this.project_name,
      location:this.location,

      Locate:this.Locate,
      bclt_name:this.bclt_name,
      barch_name:this.barch_name,
      clt_street:this.clt_street,
      arch_street:this.arch_street,
      clt_poastal:this.clt_poastal,
      arch_poastal:this.arch_poastal,
      clt_telephone:this.clt_telephone,
      arch_telephone:this.arch_telephone,
      clt_represent:this.clt_represent,
      arch_represent:this.arch_represent,
      clt_mail:this.clt_mail,
      arch_mail:this.arch_mail,
      client_mobile:this.client_mobile,
      arch_mobile:this.arch_mobile,
      clt_sign:this.clt_sign,
      arch_sign:this.arch_sign,
      clt_date:this.clt_date,
      arch_date:this.arch_date,
      clt_site:this.clt_site,
      arch_site:this.arch_site,
      clt_probuilding:this.clt_probuilding,
      arch_probuilding:this.arch_probuilding,
      clt_budget:this.clt_budget,
      arch_budget:this.arch_budget,
      clt_month:this.clt_month,
      arch_month:this.arch_month,

      spcl_cond:this.spcl_cond,
      additional_doc:this.additional_doc,
    }
    console.log(bulkquery)
   
    this.proposalService.starRating(JSON.stringify(bulkquery)).subscribe(
      (data:any) => {
        this.toastr.success('Your feedback is submitted successfully', '');
       
      });
      
    }
  }
            

 
