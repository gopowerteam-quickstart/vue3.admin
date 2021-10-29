import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'


export class Appointment extends Model {
  public Cancelled : number
  public CheckedIn : number
  public CheckedOut : number
  public Completed : number
  public Confirmed : number
  public Consulting : number
  public Failed : number
  public FirstVisit : number
  public Followuped : number
  public Inactive : number
  public Left : number
  public RemindExcluded : number
  public Reminded : number
  public Seated : number
  public appointmentType : number
  public assistantId : number
  public bifrostDataVersion : number
  public binlogEventType : string
  public checkInNo : number
  public checkInType : string
  public checkedOut : number
  public confirmType : number
  public consultItem : string
  public consultantId : number
  public department : string
  public doctorId : number
  @Type(() => Timestamp)
  public endTime : Timestamp
  public fromApptId : number
  public hasTransferred : number
  public id : number
  public notes : string
  public officeId : number
  public operatoryId : number
  public patientId : number
  @Type(() => Timestamp)
  public recordCreatedTime : Timestamp
  public recordCreatedUser : number
  @Type(() => Timestamp)
  public recordTimestamp : Timestamp
  @Type(() => Timestamp)
  public recordUpdatedTime : Timestamp
  public recordUpdatedUser : number
  public recordVersion : number
  public sourceType : string
  @Type(() => Timestamp)
  public startTime : Timestamp
  @Type(() => Timestamp)
  public stateLastUpdated : Timestamp
  public tenantId : string
  public visitSeqNo : number
}

export class AppointmentSimple extends Model {
  public cancelled : number
  public consultantName : string
  public doctorName : string
  public endTime : string
  public failed : number
  public patientId : number
  public pending : number
  public procedures : string
  public startTime : string
  public sumFee : number
}

export class ChargeOrder extends Model {
  public AliPayOrder : number
  public Append : number
  public Archived : number
  public Handle : number
  public Inactive : number
  public NeedConfirm : number
  public OldCharge : number
  public OldToNew : number
  public PayOverdue : number
  public SelfCancelled : number
  public actualPrice : number
  public actualPrice1 : number
  public actualPrice2 : number
  public actualPrice3 : number
  public advanceOverdue : number
  public advancePlanPrice : number
  public advancePrice : number
  public afterDiscountPrice : number
  public appointmentId : number
  public bifrostDataVersion : number
  public billNo : string
  public binlogEventType : string
  public cashPrice : number
  public channel : number
  public comments : string
  public discount : number
  public discountPrice : number
  public doctorId : number
  public doctorName : string
  public feeSubType : number
  public feeType : number
  public fromChargeOrderId : number
  public giftCardId : number
  public giftCertificateId : number
  public giftPrice : number
  public giftTransactionId : number
  public id : number
  public insuranceOrderId : number
  public isNotAutoCheckOut : number
  public lisOrderId : number
  public memberShipCardId : number
  public notUseMembershipDiscount : number
  public nurseId : number
  public nurseName : string
  public officeId : number
  public orderType : string
  public originalPrice : number
  public overdue : number
  public paidPrice : number
  public patientId : number
  public payDateTime : string
  public payFromChargeOrderId : number
  public payOfficeId : number
  public payType : string
  public payType2 : string
  public payType3 : string
  public payee : string
  public payeeId : number
  public planPrice : number
  public reason : string
  public recordCreatedTime : string
  public recordCreatedUser : number
  public recordTimestamp : string
  public recordUpdatedTime : string
  public recordUpdatedUser : number
  public recordVersion : number
  public scenario : number
  public sourceChargeOrderId : number
  public status : string
  public tenantId : string
  public totalPrice : number
  public uuid : string
  public yibaoOrderId : number
}

export class MedicalRecord extends Model {
  public Inactive : number
  public advice : string
  public appointId : number
  public archive : string
  public assistantId : number
  public bifrostDataVersion : number
  public binlogEventType : string
  public chargeOrderId : number
  public chiefComplaint : string
  public comment : string
  public departmentId : number
  public doctorId : string
  public doctorName : string
  public esignState : number
  public firstVisit : number
  public history : string
  public id : number
  public instructorId : number
  public instructorName : string
  public layoutTemplateCode : string
  public medicalRecordType : number
  public nurseId : string
  public nurseName : string
  public officeId : number
  public pastHistory : string
  public patientId : number
  public recordCreatedTime : string
  public recordCreatedUser : number
  public recordDateTime : string
  public recordTimestamp : string
  public recordUpdatedTime : string
  public recordUpdatedUser : number
  public recordVersion : number
  public state : number
  public tenantId : string
  public uuid : string
}

export class Patient extends Model {
  public Archived : number
  public Inactive : number
  public advisorId : number
  public aliMarketCenterAccount : string
  public archivedTime : string
  public archivedUserName : string
  public attendantId : number
  public bifrostDataVersion : number
  public binlogEventType : string
  public birth : string
  public brithType : number
  public consultantId : number
  public doctorId : number
  public dutyDoctorId : number
  public email : string
  public firstVisit : string
  public homeAddress : string
  public id : number
  public identityCard : string
  public lastDoctorId : number
  public lastVisit : string
  public marketCenterAccount : string
  public medicalAlert : string
  public membershipId : number
  public mobile : string
  public name : string
  public nameCode : string
  public nationality : string
  public nickName : string
  public notes : string
  public occupation : string
  public officeId : number
  public otherPrivateId : string
  public overdue : number
  public patientType : string
  public phoneNumber : string
  public pictureId : number
  public point : number
  public privateId : string
  public qq : string
  public recordCreatedTime : string
  public recordCreatedUser : number
  public recordTimestamp : string
  public recordUpdatedTime : string
  public recordUpdatedUser : number
  public recordVersion : number
  public refereeId : number
  public refereeMobileOrCode : string
  public refereeName : string
  public sex : number
  public sourceType : string
  public sourceTypeLevel1 : string
  public tag : string
  public tenantId : string
  public uuid : string
  public weixin : string
}

export class Provider extends Model {
  public Inactive : number
  public Intern : number
  public MobileVerified : number
  public bifrostDataVersion : number
  public binlogEventType : string
  public birth : string
  public certificateNo : string
  public department : string
  public departmentId : number
  public email : string
  public employeeNo : string
  public homeAddress : string
  public id : number
  public identityCard : string
  public instructorId : number
  public job : string
  public mobile : string
  public mobileAreaCode : string
  public name : string
  public nameCode : string
  public officeId : number
  public officeName : string
  public recordCreatedTime : string
  public recordCreatedUser : number
  public recordDate : string
  public recordUpdatedTime : string
  public recordUpdatedUser : number
  public recordVersion : number
  public relatedProviderId : number
  public sex : number
  public show : number
  public tenantId : string
  public title : string
  public userId : number
  public uuid : string
}

export class Timestamp extends Model {
  public date : number
  public day : number
  public hours : number
  public minutes : number
  public month : number
  public nanos : number
  public seconds : number
  public time : number
  public timezoneOffset : number
  public year : number
}
