<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div v-if="sidebarMenu.length > 0">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            
            v-for="route in sidebarMenu"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { power } from "@/api/power";

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      sidebarMenu: [],
    };
  },
  mounted() {
    

    const routesMenu = this.$router.options.routes;
    
    let allMenus = {};

    for (let m = 0; m < routesMenu.length; m++) {
      if (
        !routesMenu[m].hidden &&
        routesMenu[m].meta &&
        routesMenu[m].meta.title
      )
        allMenus[routesMenu[m].meta.title] = routesMenu[m];
    }


    let menus = [];
  
    power().then((res) => { 
      res.data.forEach((val,key) => {
        if (val) {
            let adddd = allMenus[val["p_name"]].children;
            let valchild = val.children
            
            if (adddd.length != valchild.length) {
               let arr = [];
               valchild.forEach((one,k) => {
                  arr.push(one.p_name);
               })
               
               adddd.forEach((items,anub) => {
                  if (!arr.includes(items.meta.title)) {
                    delete adddd[anub];
                  }
               })
            }

            menus.push(allMenus[val["p_name"]]);
            
        }
      });
      this.sidebarMenu = menus;
     
    });
    
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
