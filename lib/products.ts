// 6 款商捷过检设备的产品彩页数据，供"资料中心-产品彩页"栏与设备详情页共用

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductScenario {
  title: string // 场景标题
  desc: string // 场景说明
  image: string // 场景图文件名（位于 /images/scenarios 下）
}

export interface ProductFeature {
  title: string // 特色标题
  desc: string // 特色说明
  image: string // 特色图文件名（位于 /images/features 下）
}

export interface ProductAccessory {
  name: string // 配件名称
  image: string // 配件图文件名（位于 /images/accessories 下）
}

export interface ProductDevice {
  slug: string // 路由标识，如 /device/t671a
  name: string // 设备名称
  image: string // 产品图文件名（位于 /images/products 下）
  model: string // 认证型号
  os: string // 操作系统
  storage: string // 存储器
  businessMode: string // 业务模式
  brochureFile: string // 彩页 PDF 文件名（位于 /docs 下）
  downloadName: string // 下载时的文件名
  series: string // 产品系列/型号别名
  brochureSize: string // 彩页大小兜底值（前端会实时探测覆盖）
  specs: ProductSpec[] // 详细技术参数
  features?: ProductFeature[] // 产品特色（可选）
  scenarios?: ProductScenario[] // 应用场景（可选）
  scenariosTitle?: string // 应用场景标题（可选，默认"典型应用场景"）
  accessories?: ProductAccessory[] // 可选配件（可选）
}

export const products: ProductDevice[] = [
  {
    slug: "t671a",
    name: "商捷平板终端",
    image: "t671a.png",
    model: "T671A",
    os: "安卓13，商米OS",
    storage: "4G + 64G",
    businessMode: "全自助 / 半自助",
    brochureFile: "brochure-t671a.pdf",
    downloadName: "平板T671A下载.pdf",
    series: "SUNJI T671A 智能平板终端",
    brochureSize: "928.6 KB",
    specs: [
      { label: "认证型号", value: "T671A" },
      { label: "操作系统", value: "安卓13（商米OS）" },
      { label: "处理器", value: "ARM 8核，最高2.4GHz" },
      { label: "存储器", value: "4G RAM + 64G ROM" },
      { label: "显示屏", value: '10.95" 高清屏，1200*1920' },
      { label: "刷脸摄像头", value: "3D 结构光摄像头" },
      { label: "后置摄像头", value: "13M AF" },
      { label: "电池", value: "8000mAh" },
      { label: "通信方式", value: "4G / Wi-Fi 2.4G&5G / 蓝牙5.3" },
      { label: "NFC", value: "屏下 NFC" },
      { label: "业务模式", value: "全自助 / 半自助" },
    ],
    scenarios: [
      {
        title: "基层卫生机构体检与公卫服务",
        desc: "适配基层卫生机构的体检登记与公共卫生服务场景，快速采集与核验居民信息。",
        image: "t671a-clinic.png",
      },
      {
        title: "病房移动护理与床旁数据采集",
        desc: "8000mAh 大电池支持全天移动作业，满足病房移动护理与床旁数据采集需求。",
        image: "t671a-ward.png",
      },
      {
        title: "家庭医生随访与健康管理",
        desc: "轻便机身与多种身份/支付介质读取，助力家庭医生随访与居民健康管理。",
        image: "t671a-homevisit.png",
      },
    ],
    accessories: [
      { name: "桌面版底座", image: "t671a-desktop-stand.png" },
      { name: "打印机底座", image: "t671a-printer-stand.png" },
      { name: "全功能底座", image: "t671a-full-stand.png" },
    ],
  },
  {
    slug: "t3b0b",
    name: "商捷碰一碰终端",
    image: "t3b0b.png",
    model: "T3B0B",
    os: "安卓11，商米OS",
    storage: "4G + 64G",
    businessMode: "半自助",
    brochureFile: "brochure-t3b0b.pdf",
    downloadName: "桌面T3B0B下载.pdf",
    series: "SUNJI F2H 医保智能终端",
    brochureSize: "18.1 MB",
    specs: [
      { label: "认证型号", value: "T3B0B" },
      { label: "操作系统", value: "基于安卓11深度定制安全系统" },
      { label: "处理器", value: "8核，最高1.6GHz" },
      { label: "存储器", value: "4GB + 64GB" },
      { label: "电源适配器", value: "输入：AC100~240V/0.6A；输出：DC12V/2A" },
      { label: "整机尺寸（长*宽*高）", value: "整机：216mm × 147mm × 356mm；包装：266mm × 200mm × 422mm" },
      { label: "显示屏", value: '8" 高清屏，1280*800，电容多点触摸' },
      { label: "摄像头", value: "3D 结构光摄像头" },
      { label: "支付宝碰一下", value: "支持" },
      { label: "整机重量", value: "约 1475g（裸机）" },
      { label: "业务模式", value: "半自助" },
    ],
    features: [
      {
        title: "副屏搭配",
        desc: "搭配独立副屏，实现医患双向交互，辅助医保结算与信息展示，提升窗口服务效率。",
        image: "t3b0b-subscreen.png",
      },
      {
        title: "三种支付方式",
        desc: "支持支付宝碰一下小蓝环、扫码窗与人脸识别摄像头三种支付方式，医保自费一次付。",
        image: "t3b0b-payment.png",
      },
      {
        title: "可翻转屏体",
        desc: "屏体支持 15°–75° 多角度翻转调节，适配不同医疗柜台高度，符合人体工学操作。",
        image: "t3b0b-flip.png",
      },
    ],
    scenariosTitle: "使用场景",
    scenarios: [
      {
        title: "医院窗口",
        desc: "部署于医院挂号、收费、取药等业务窗口，支持建卡关联与医保结算，加速患者就诊全流程。",
        image: "t3b0b-hospital.png",
      },
      {
        title: "药店柜台",
        desc: "适配药店柜台购药结算场景，医患面对面完成刷脸/扫码/碰一下支付，操作便捷高效。",
        image: "t3b0b-pharmacy.png",
      },
    ],
  },
  {
    slug: "t6711",
    name: "商捷桌面终端",
    image: "t6711.png",
    model: "T6711",
    os: "安卓8，蚂蚁OS",
    storage: "4G + 64G",
    businessMode: "半自助",
    brochureFile: "brochure-t6711.pdf",
    downloadName: "桌面T6711下载.pdf",
    series: "SUNJI FT2 医保智能终端",
    brochureSize: "471.5 KB",
    specs: [
      { label: "认证型号", value: "T6711" },
      { label: "操作系统", value: "安卓8.1（蚂蚁OS）" },
      { label: "处理器", value: "8核，1.8GHz" },
      { label: "存储器", value: "64GB ROM + 4GB RAM" },
      { label: "电源适配器", value: "输入：AC100~240V/0.6A；输出：DC12V/2A" },
      { label: "整机尺寸（长*宽*高）", value: "主机包装：38.01mm × 246.88mm × 229.3mm" },
      { label: "显示屏", value: '10" 高清屏，1280*800，电容多点触摸' },
      { label: "摄像头", value: "3D 结构光摄像头" },
      { label: "整机重量", value: "930g（裸机）" },
      { label: "安装方式", value: "玻璃 / 桌面 / 墙面（支持VESA支架）" },
      { label: "业务模式", value: "半自助" },
    ],
  },
  {
    slug: "t3b0a",
    name: "商捷融合终端",
    image: "t3b0a.png",
    model: "T3B0A",
    os: "安卓11，商米OS",
    storage: "4G + 64G",
    businessMode: "半自助",
    brochureFile: "brochure-t3b0a.pdf",
    downloadName: "融合T3B0A下载.pdf",
    series: "SUNJI F2H LITE 医保智能终端",
    brochureSize: "415.7 KB",
    specs: [
      { label: "认证型号", value: "T3B0A" },
      { label: "操作系统", value: "安卓11（商米OS）" },
      { label: "处理器", value: "8核，1.6GHz" },
      { label: "存储器", value: "64GB ROM + 4GB RAM" },
      { label: "电源适配器", value: "输入：AC100~240V/0.6A；输出：DC12V/2A" },
      { label: "认证", value: "3C、RoHS、进网、无委、医保" },
      { label: "显示屏", value: '8" 高清屏，1280*800，电容多点触摸' },
      { label: "摄像头", value: "3D 结构光摄像头" },
      { label: "触摸屏", value: "支持抗干扰模式（湿手/手套操作）" },
      { label: "整机重量", value: "930g（裸机）" },
      { label: "业务模式", value: "半自助（支持院内设备融合组装）" },
    ],
  },
  {
    slug: "t6f01",
    name: "商捷手持终端",
    image: "t6f01.png",
    model: "T6F01",
    os: "安卓11，商米OS",
    storage: "2G + 64G",
    businessMode: "全自助 / 半自助",
    brochureFile: "brochure-t6f01.pdf",
    downloadName: "手持T6F01下载.pdf",
    series: "SUNJI P2 Xpro 医保手持终端",
    brochureSize: "702.0 KB",
    specs: [
      { label: "认证型号", value: "T6F01" },
      { label: "操作系统", value: "安卓11 安全操作系统" },
      { label: "处理器", value: "8核 A55，1.6GHz" },
      { label: "存储器", value: "64GB ROM + 2GB RAM" },
      { label: "充电器", value: "输入：AC100~240V；输出：5V/2A" },
      { label: "整机尺寸（长*宽*高）", value: "长 240mm × 宽 84.2mm × 高 53.8mm" },
      { label: "扫码器", value: "二维扫码头" },
      { label: "显示屏", value: '5.99" HD+，1440*720，IPS多点触控' },
      { label: "摄像头", value: "前置3D结构光 / 后置5M AF" },
      { label: "打印机", value: "内置 58 热敏打印机" },
      { label: "电池", value: "锂电池 2×3500mAh（3.8V）" },
      { label: "整机重量", value: "600g（裸机）" },
      { label: "业务模式", value: "全自助 / 半自助" },
    ],
  },
  {
    slug: "f4e0m",
    name: "商捷自助终端",
    image: "f4e0m.png",
    model: "F4E0M",
    os: "安卓9，商米OS",
    storage: "4G + 32G",
    businessMode: "全自助",
    brochureFile: "brochure-f4e0m.pdf",
    downloadName: "自助F4E0M下载.pdf",
    series: "SUNJI K2H 医疗智能自助终端",
    brochureSize: "727.2 KB",
    specs: [
      { label: "认证型号", value: "F4E0M" },
      { label: "操作系统", value: "安卓9 安全操作系��" },
      { label: "处理器", value: "ARM 6核，可达1.8GHz" },
      { label: "存储器", value: "32GB ROM + 4GB RAM" },
      { label: "显示屏", value: '24" FHD，1080*1920，电容多点触摸' },
      { label: "摄像头", value: "3D 结构光摄像头" },
      { label: "打印机", value: "80mm 热敏打印机（兼容58）" },
      { label: "身份证/非接卡", value: "支持二代身份证及 M0/M1/CPU 非接卡" },
      { label: "业务模式", value: "全自助（支持挂壁 / 立式扩展）" },
    ],
  },
]

export function getProductBySlug(slug: string): ProductDevice | undefined {
  return products.find((p) => p.slug === slug)
}
