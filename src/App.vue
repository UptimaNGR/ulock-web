<template>
  <div class="app" data-app>
    <router-view />
    <footer>
      <p class="copyright">© 2022 Uptima Solutions</p>
      <p class="phone">08168205169 08140710074</p>
    </footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  })
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@200;400;700&family=Poppins:wght@400;500;600&display=swap');

.app {
  font-family: 'Catamaran', sans-serif;
}

footer {
  padding: 50px;
  text-align: center;
  color: #627081;
  font-weight: 400;
}
.copyright {
  font-size: 18px;
}
.phone {
  font-size: 16px;
}
</style>
