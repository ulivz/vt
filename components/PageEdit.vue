<template>
  <footer class="page-edit">
    <div v-if="editLink" class="edit-link">
      <VPIconEdit class="edit-icon" />
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{
        editLinkText
      }}</a>
    </div>

    <div v-if="lastUpdated" class="last-updated">
      <VPIconLastUpdated class="last-updated-icon" />
      <span class="prefix">{{ lastUpdatedText }}:&nbsp;</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script>
import isNil from "lodash/isNil";
import { endingSlashRE, outboundRE } from "../lib/util";
import VPIconEdit from "./icons/VPIconEdit.vue";
import VPIconLastUpdated from "./icons/VPIconLastUpdated.vue";

export default {
  name: "PageEdit",

  components: {
    VPIconEdit,
    VPIconLastUpdated,
  },

  computed: {
    lastUpdated() {
      return this.$page.lastUpdated;
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },

    editLink() {
      const showEditLink = isNil(this.$page.frontmatter.editLink)
        ? this.$site.themeConfig.editLinks
        : this.$page.frontmatter.editLink;

      const {
        repo,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo,
      } = this.$site.themeConfig;

      if (showEditLink && docsRepo && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
      return null;
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    },
  },

  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(docsRepo)) {
        const base = docsRepo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const gitlab = /gitlab.com/;
      if (gitlab.test(docsRepo)) {
        const base = docsRepo;
        return (
          base.replace(endingSlashRE, "") +
          `/-/edit` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        "/edit" +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    },
  },
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .edit-link {
    display: flex;
    align-items: center;

    .edit-icon {
      fill: currentColor;
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }

    a {
      color: var(--vp-c-page-edit-text);
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    display: flex;
    align-items: center;

    .prefix {
      font-weight: 500;
      color: var(--vp-c-page-edit-text);
    }

    .last-updated-icon {
      fill: currentColor;
      width: 22px;
      height: 22px;
      margin-right: 5px;
    }

    .time {
      font-weight: 400;
      color: #767676;
    }
  }
}

@media (max-width: $MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
