<template>
  <div class="container"></div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "NameSearchResponse",
  props: {
    nameMember: String,
    action: String,
  },

  data() {
    return {};
  },

  watch: {
    action() {
      if (this.action == "win") {
        this.openWinner();
      } else if (this.action == "lose") {
        this.openLoser();
      }
    },
  },

  methods: {
    openWinner() {
      ElMessageBox.confirm(
        `Congratulations, ${this.nameMember} is a lucky name! You've won a prize. Will you accept it?`,
        "You are the WINNER!",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Reject",
        }
      )
        .then(() => {
          ElMessage({
            type: "success",
            message: "Your prize has been confirmed",
          });
          this.$emit('win', true)
        })
        .catch((action) => {
          ElMessage({
            type: "error",
            message: "Your prize has been rejected",
          });
          this.$emit('win', false)
        });
    },

    openLoser() {
      ElMessageBox.alert(
        `I'm sorry, ${this.nameMember} is not in today's list of lucky names`,
        ":(",
        {
          confirmButtonText: "OK",
          callback: () => {
            this.$emit("win", false);
          },
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 50%;
}
</style>
