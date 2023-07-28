import { Result } from "../types/result";
import { User } from "../types/user";

let user: User = {
  'userId': '1992',
  'username': 'admin',
}

const menus = [
  {
    id: "/workspace",
    icon: "layui-icon-home",
    title: "工作空间",
    children: [
      {
        id: "/workspace/workbench",
        icon: "layui-icon-util",
        title: "工作台"
      },
      {
        id: "/workspace/console",
        icon: "layui-icon-engine",
        title: "控制台"
      },
      {
        id: "/workspace/analysis",
        icon: "layui-icon-chart-screen",
        title: "分析页"
      },
      {
        id: "/workspace/monitor",
        icon: "layui-icon-find-fill",
        title: "监控页"
      }
    ]
  },
  {
    id: "/form",
    icon: "layui-icon-table",
    title: "表单页面",
    children: [
      {
        id: "/form/base",
        icon: "layui-icon-form",
        title: "基础表单"
      }, {
        id: "/form/intricate",
        icon: "layui-icon-form",
        title: "复杂表单"
      }
      , {
        id: "/form/step",
        icon: "layui-icon-form",
        title: "分步表单"
      }
    ]
  },
  {
    id: "/table",
    icon: "layui-icon-align-left",
    title: "列表页面",
    children: [
      {
        id: "/table/base",
        icon: "layui-icon-search",
        title: "查询列表"
      },
      {
        id: "/table/card",
        icon: "layui-icon-file-b",
        title: "卡片列表"
      },
      {
        id: "/table/project",
        icon: "layui-icon-templeate-one",
        title: "项目列表"
      },
      {
        id: "/table/article",
        icon: "layui-icon-carousel",
        title: "文章列表"
      }
    ]
  },
  {
    id: "/result",
    icon: "layui-icon-template",
    title: "结果页面",
    children: [
      {
        id: "/result/success",
        icon: "layui-icon-success",
        title: "成功页面"
      },
      {
        id: "/result/failure",
        icon: "layui-icon-error",
        title: "失败页面"
      }
    ]
  }, {
    id: "/error",
    icon: "layui-icon-unlink",
    title: "异常页面",
    children: [
      {
        id: "/error/403",
        icon: "layui-icon-not-found",
        title: "403"
      },
      {
        id: "/error/404",
        icon: "layui-icon-not-found",
        title: "404"
      },
      {
        id: "/error/500",
        icon: "layui-icon-not-found",
        title: "500"
      }
    ]
  },
  {
    id: "/menu",
    icon: "layui-icon-app",
    title: "菜单嵌套",
    children: [
      {
        id: "/menu/menu1",
        icon: "layui-icon-component",
        title: "二级菜单",
        children: [
          {
            id: "/menu/menu1/menu1",
            icon: "layui-icon-template-one",
            title: "三级菜单"
          },
          {
            id: "/menu/menu1/menu2",
            icon: "layui-icon-template-one",
            title: "三级菜单"
          }
        ]
      },
      {
        id: "/menu/menu2",
        icon: "layui-icon-component",
        title: "二级菜单",
        children: [
          {
            id: "/menu/menu2/menu1",
            icon: "layui-icon-template-one",
            title: "三级菜单"
          },
          {
            id: "/menu/menu2/menu2",
            icon: "layui-icon-template-one",
            title: "三级菜单"
          }
        ]
      }
    ]
  }, {
    id: "/directive",
    icon: "layui-icon-test",
    title: "内置指令",
    children: [
      {
        id: "/directive/permission",
        icon: "layui-icon-template",
        title: "权限指令"
      }
    ]
  }, {
    id: "/page",
    icon: "layui-icon-link",
    title: "外链页面",
    children: [
      {
        id: "layui-icon-layer",
        icon: "layui-icon-home",
        title: "弹层外链",
        type: "modal"
      },
      {
        id: "http://www.baidu.com",
        icon: "layui-icon-layouts",
        title: "原生跳转",
        type: "blank"
      }
    ]
  },
  {
    id: '/enrollee',
    icon: "layui-icon-slider",
    title: '个人中心',
    children: [
      {
        id: '/enrollee/profile',
        icon: "layui-icon-username",
        title: '我的资料',
      },
      {
        id: '/enrollee/message',
        icon: "layui-icon-email",
        title: '我的消息',
      },
    ]
  },
  {
    id: '/system',
    icon: "layui-icon-set",
    title: '系统管理',
    children: [
      {
        id: '/system/user',
        icon: "layui-icon-user",
        title: '用户管理',
      },
      {
        id: '/system/role',
        icon: "layui-icon-user",
        title: '角色管理',
      },
      {
        id: '/system/menu',
        icon: "layui-icon-spread-left",
        title: '菜单管理',
      },
      {
        id: '/system/organization',
        icon: "layui-icon-transfer",
        title: '机构管理',
      },

      {
        id: '/system/dictionary',
        icon: "layui-icon-read",
        title: '字典管理',
      },
      {
        id: '/system/file',
        icon: "layui-icon-file",
        title: '文件管理',
      },
      {
        id: '/system/login',
        icon: "layui-icon-date",
        title: '登录日志',
      },
      {
        id: '/system/option',
        icon: "layui-icon-survey",
        title: '操作日志',
      },

    ]
  },

]

const getInfo = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: user,
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getPermission = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: ['sys:user:add', 'sys:user:edit', 'sys:user:delete', 'sys:user:import', 'sys:user:export'],
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getMenu = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: menus,
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getLogin = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let account = item.account;
  let password = item.password;
  if (account === 'admin' && password === '123456') {
    return {
      'code': 200,
      'msg': '登陆成功',
      'data': {
        'userId': '35002',
        'token': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw',
      }
    }
  } else {
    return {
      'code': 500,
      'msg': '登陆失败,账号密码不正确'
    }
  }
}

const getUpload = (req: any, res: any) => {
  return {
    'code': 200,
    'msg': '上传成功',
    'success': true
  }
}

export default {
  getInfo, getMenu, getLogin, getPermission, getUpload
}