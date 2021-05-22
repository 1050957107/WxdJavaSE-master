import Vue from 'vue';
import Router from 'vue-router';  // 引入vue-router
import Home from "@/components/common/Home";
import BasicInformationTable from "@/views/tables/Basic_Information_Table";
import ExceptionInformationTable from "@/views/tables/Abnormal_information_statistics";
import GameInformationStatistics from "@/views/tables/Game_Information_Statistics";
import MaintenanceInformationSheet from "@/views/tables/Maintenance_Information_Sheet";
import NotFound from "@/components/404";
import Listofabnormalinformation from "@/views/tables/Exception_information_list";

Vue.use(Router)  // 在vue中注入Router

let router = new Router({
    base: '/dist/',
        routes: [
            {
                path: '*',
                component: NotFound
            },
            {
                path: '/',
                redirect: '/BasicInformationTable'
            },
            {
                path: '/',
                component: Home,
                redirect: "/BasicInformationTable",
                meta: { title: '设备基本信息表' },
                children: [
                    {
                        path: '/BasicInformationTable',
                        component: BasicInformationTable,
                        meta: { title: '设备基本信息表' }
                    },
                    {
                        path: "ExceptionInformationTable",
                        component: ExceptionInformationTable,
                        meta: { title: '异常信息表' }
                    },
                    {
                        path: "GameInformationStatistics",
                        component: GameInformationStatistics,
                        meta: { title: '游戏信息统计表' }
                    },
                    {
                        path: "MaintenanceInformationSheet",
                        component: MaintenanceInformationSheet
                    },
                    {
                        path: "Listofabnormalinformation",
                        component: Listofabnormalinformation,
                        meta: { title: '异常信息明细表' }
                    }
                ]
            }
        ]
    })
;
export default router