import { Type } from 'class-transformer'
import { Model } from '@gopowerteam/http-request'


export class BatchJoinGroupRequest extends Model {
  /**
   * 选中的客户
   */
  public employeeCustomerIds : string[]
  /**
   * 分组ID
   */
  public employeeCustomerTagConfig : string
}

export class Branch extends Model {
  /**
   * 内容
   */
  public content : string
  /**
   * 内容图片
   */
  @Type(() => Picture)
  public contentPics : Picture[]
  /**
   * 封面滚动图片
   */
  @Type(() => Picture)
  public coverPics : Picture[]
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * eky office id
   */
  public officeId : number
  /**
   * eky office Name
   */
  public officeName : string
  /**
   * title
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class ChangeDiagnosisRequest extends Model {
  /**
   * 选中的牙位
   */
  public selectedPosition : string[]
  /**
   * 治疗方案
   */
  public treatmentSolutions : string
}

export class ConsultationRecord extends Model {
  /**
   * 对应E看牙预约记录ID
   */
  public appointmentId : number
  /**
   * 患者到院时间(挂号时间)
   */
  public checkInTime : string
  /**
   * 就诊类型
   */
  public checkInType : string
  /**
   * 咨询师ID
   */
  public consultantId : string
  /**
   * 咨询师接诊时间
   */
  public consultationTime : string
  /**
   * 创建时间
   */
  public createTime : string
  /**
   * CT照片文件列表
   */
  public ctPhotos : string[]
  /**
   * CT照片选中问题
   */
  public ctSelectedDisease : string[]
  /**
   * 对应的客户
   */
  @Type(() => HospitalCustomer)
  public customer : HospitalCustomer
  /**
   * 成交状态
   */
  public dealtState : boolean
  /**
   * 科室
   */
  public department : string
  /**
   * 医生
   */
  public doctorName : string
  /**
   * 正面咬合照
   */
  @Type(() => OralPhoto)
  public frontalBitePhoto : OralPhoto
  public id : number
  /**
   * 是否到院
   */
  public isCheckIn : boolean
  /**
   * 是否已经接诊
   */
  public isConfirmed : boolean
  /**
   * 是否开始治疗
   */
  public isSeated : boolean
  /**
   * 下颌照
   */
  @Type(() => OralPhoto)
  public jawPhoto : OralPhoto
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 左侧咬合照
   */
  @Type(() => OralPhoto)
  public leftBitePhoto : OralPhoto
  /**
   * 主诉
   */
  public mainQuestions : string[]
  /**
   * 上颌照
   */
  @Type(() => OralPhoto)
  public maxillaryPhoto : OralPhoto
  /**
   * e看牙分院ID
   */
  public officeId : number
  /**
   * 预约项目
   */
  public procedureList : string[]
  /**
   * 右侧咬合照
   */
  @Type(() => OralPhoto)
  public rightBitePhoto : OralPhoto
  /**
   * 预约开始时间
   */
  public startTime : string
  /**
   * 记录状态
   */
  public state : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class DailyStatisticsResponse extends Model {
  /**
   * 实际到院人数
   */
  public checkInCount : number
  /**
   * 客户消费金额
   */
  public consumptionAmount : string
  /**
   * 充值金额
   */
  public rechargeAmount : string
  /**
   * 预约人数
   */
  public reservationsCount : number
  /**
   * 成交人数
   */
  public transactionsCount : number
}

export class Department extends Model {
  /**
   * 隶属分院
   */
  public branchId : string
  /**
   * 内容
   */
  public content : string
  /**
   * 内容图片
   */
  @Type(() => Picture)
  public contentPics : Picture[]
  /**
   * 封面滚动图片
   */
  @Type(() => Picture)
  public coverPics : Picture[]
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * title
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class Diagnosis extends Model {
  /**
   * 对应的接诊记录
   */
  @Type(() => ConsultationRecord)
  public consultationRecord : ConsultationRecord
  /**
   * 创建时间
   */
  public createTime : string
  /**
   * 对应的疾病
   */
  @Type(() => Disease)
  public disease : Disease
  public id : string
  /**
   * 选中的牙位
   */
  public selectedPosition : string[]
  /**
   * 治疗方案
   */
  public treatmentSolutions : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class DiagnosisSimpleResponse extends Model {
  @Type(() => Disease)
  public disease : Disease
  public id : string
  public selectedPosition : string[]
}

export class Disease extends Model {
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 知识ID列表
   */
  public knowledgeIDs : string[]
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 图片
   */
  @Type(() => Picture)
  public pictures : Picture[]
  /**
   * 排序
   */
  public sortOrder : number
  /**
   * title
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
  /**
   * 回访ID列表
   */
  public visitIDs : string[]
}

export class EmployeeCustomer extends Model {
  /**
   * 客户关注
   */
  public concerns : string[]
  /**
   * 创建时间
   */
  public createTime : string
  /**
   * 对应的客户
   */
  @Type(() => HospitalCustomer)
  public customer : HospitalCustomer
  /**
   * 员工ID
   */
  public employeeId : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 备注
   */
  public remark : string
  /**
   * 标签
   */
  public tags : string[]
  /**
   * 更新时间
   */
  public updateTime : string
  /**
   * 微信客户ID
   */
  public wxCustomerId : string
}

export class EmployeeCustomerTagConfig extends Model {
  /**
   * 创建时间
   */
  public createTime : string
  /**
   * 员工ID
   */
  public employeeId : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 标签
   */
  public name : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class EmployeeCustomerTagConfigCreateRequest extends Model {
  /**
   * 标签
   */
  public name : string
}

export class Expert extends Model {
  /**
   * 隶属分院
   */
  public branchIds : string[]
  /**
   * 内容
   */
  public content : string
  /**
   * 内容图片
   */
  @Type(() => Picture)
  public contentPics : Picture[]
  /**
   * 封面滚动图片
   */
  @Type(() => Picture)
  public coverPics : Picture[]
  /**
   * 创建时间
   */
  public createTime : string
  /**
   * 隶属科室
   */
  public departmentIds : string[]
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 职称
   */
  public positions : string
  /**
   * title
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class HospitalCustomer extends Model {
  /**
   * 生日
   */
  public birth : string
  /**
   * 创建时间
   */
  public createTime : string
  /**
   * E看牙标签
   */
  public ekyTags : string[]
  /**
   * 性别 男 女 未知
   */
  public gender : string
  public id : number
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 主诉
   */
  public mainQuestions : string[]
  /**
   * 手机号
   */
  public mobile : string
  /**
   * E看牙患者ID
   */
  public patientId : number
  /**
   * E看牙患者姓名
   */
  public patientName : string
  /**
   * 患者类型
   */
  public patientType : string
  /**
   * 电话号码
   */
  public phoneNumber : string
  /**
   * E看牙病历号
   */
  public privateId : string
  /**
   * 患者来源
   */
  public sourceType : string
  /**
   * 更新时间
   */
  public updateTime : string
  /**
   * 微信客户ID
   */
  public wxCustomerId : string
}

export class Knowledge extends Model {
  /**
   * 分组
   */
  public categories : string[]
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 图片
   */
  @Type(() => Picture)
  public pictures : Picture[]
  /**
   * 排序
   */
  public sortOrder : number
  /**
   * 标题
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class KnowledgeCategory extends Model {
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 排序
   */
  public sortOrder : number
  /**
   * 标题
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class KnowledgeDto extends Model {
  /**
   * 分组
   */
  @Type(() => KnowledgeCategory)
  public categories : KnowledgeCategory[]
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 图片
   */
  @Type(() => Picture)
  public pictures : Picture[]
  /**
   * 排序
   */
  public sortOrder : number
  /**
   * 标题
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class OralPhoto extends Model {
  /**
   * 照片文件存储key
   */
  public photoFile : string
  public selectedDiseaseId : string[]
}

export class OralPhotoDiseaseRequest extends Model {
  /**
   * 选择的疾病ID
   */
  public diseaseId : string
  /**
   * 照片类型
   */
  public photoType : string
}

export class Picture extends Model {
  /**
   * 排序
   */
  public sortOrder : number
  public title : string
  public url : string
}

export class Rule extends Model {
  /**
   * 几天后回访
   */
  public afterDays : number
  /**
   * 话术
   */
  public howtosay : string
}

export class Sort extends Model {
  public empty : boolean
  public sorted : boolean
  public unsorted : boolean
}

export class TreatmentPlan extends Model {
  /**
   * 对应E看牙预约记录ID
   */
  public appointmentId : number
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 疾患名称
   */
  public name : string
  /**
   * 选中的疾病ID
   */
  public selectedDisease : string[]
  /**
   * 选中的牙位
   */
  public selectedPosition : string[]
  /**
   * 状态
   */
  public state : string
  /**
   * 治疗方案
   */
  public treatmentSolutions : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class TreatmentPlanCreateRequest extends Model {
  /**
   * 选中的疾患
   */
  public selectedDiagnosis : string[]
  /**
   * 选中的牙位
   */
  public selectedPosition : string[]
  /**
   * 治疗方案
   */
  public treatmentSolutions : string
}

export class UpdateCustomerRequest extends Model {
  /**
   * 客户关注
   */
  public concerns : string[]
  /**
   * 选中的分组ID
   */
  public employeeCustomerTagConfigIds : string[]
  /**
   * 备注
   */
  public remark : string
}

export class UpdateGroupListRequest extends Model {
  /**
   * 选中的分组ID
   */
  public employeeCustomerTagConfigIds : string[]
}

export class UploadOralPhotoRequest extends Model {
  /**
   * 照片文件存储key
   */
  public photoFile : string
  /**
   * 照片类型
   */
  public photoType : string
}

export class Visit extends Model {
  /**
   * 创建时间
   */
  public createTime : string
  public id : string
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 多个规则
   */
  @Type(() => Rule)
  public rules : Rule[]
  /**
   * 标题
   */
  public title : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class VisitQueue extends Model {
  /**
   * 创建时间
   */
  public createTime : string
  /**
   * 疾病id
   */
  public diseaseId : string
  /**
   * 疾病名称
   */
  public diseaseTitle : string
  /**
   * 员工Id
   */
  public employeeId : string
  /**
   * 话术
   */
  public howtosay : string
  public id : string
  /**
   * 回访状态
   */
  public isVisited : boolean
  /**
   * 最后一次操作的管理员姓名
   */
  public lastOperatorName : string
  /**
   * 患者id
   */
  public patientId : number
  /**
   * 患者姓名
   */
  public patientName : string
  /**
   * 更新时间
   */
  public time : string
  /**
   * 更新时间
   */
  public updateTime : string
}

export class VisitQueueCreateRequest extends Model {
  /**
   * 疾病
   */
  public diseaseIds : string[]
  /**
   * 患者id
   */
  public patientId : number
  /**
   * 患者姓名
   */
  public patientName : string
}

export class VisitQueueQueryRequest extends Model {
  /**
   * 结束日期
   */
  public endDate : string
  /**
   * 回访状态
   */
  public isVisited : boolean
  /**
   * 开始日期
   */
  public startDate : string
}
