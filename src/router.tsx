import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { AppShell } from './components/templates/appShell'
import { DashboardPage } from './components/pages/dashboardPage'
import { PlayDateEditorPage } from './components/pages/playDateEditorPage'
import { SettingsPage } from './components/pages/settingsPage'
import { FamiliesPage } from './components/pages/familiesPage'

const rootRoute=createRootRoute({component:AppShell})
const indexRoute=createRoute({getParentRoute:()=>rootRoute,path:'/',component:DashboardPage})
const datesRoute=createRoute({getParentRoute:()=>rootRoute,path:'/playdates',component:()=> <DashboardPage showAll/>})
const newRoute=createRoute({getParentRoute:()=>rootRoute,path:'/new',component:PlayDateEditorPage})
const editRoute=createRoute({getParentRoute:()=>rootRoute,path:'/edit/$playDateId',component:()=> <PlayDateEditorPage editId={Number(location.pathname.split('/').pop())}/>})
const settingsRoute=createRoute({getParentRoute:()=>rootRoute,path:'/settings',component:SettingsPage})
const familiesRoute=createRoute({getParentRoute:()=>rootRoute,path:'/families',component:FamiliesPage})
const routeTree=rootRoute.addChildren([indexRoute,datesRoute,newRoute,editRoute,settingsRoute,familiesRoute])
export const router=createRouter({routeTree})
declare module '@tanstack/react-router'{interface Register{router:typeof router}}
