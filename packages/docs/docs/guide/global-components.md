# Global Components

## `<VPLink />`

A universal link component with internal and external link support:

- Input:

```vue
<VPLink class="nav-link" text="Guide" link="/guide/" rel="guide" />
```

- Output:

<VPLink class="nav-link" text="Guide" link="/guide/" rel="guide" />

## `<NextSteps />`

- Input:

```vue
<NextSteps>
  <Step href="/guide/getting-started.html" title="Getting Started" description="Learn how to quickly install and use this theme."/>
  <Step href="/config/" title="Config" description="Learn about the configuration of this theme."/>
  <Step href="/guide/migration.html" title="Migration" description="Migrate from other VuePress themes."/>
</NextSteps>
```

- Output:

<NextSteps>
  <Step href="/guide/getting-started.html" title="Getting Started" description="Learn how to quickly install and use this theme."/>
  <Step href="/config/" title="Config" description="Learn about the configuration of this theme."/>
  <Step href="/guide/migration.html" title="Migration" description="Migrate from other VuePress themes."/>
</NextSteps>

## `<Details />`

- Input:

```md
<Details>
<Summary>Create <code>.gitignore</code>.</Summary>

```bash
echo 'node_modules
dist' >> .gitignore
```

</Details>

- Output:

<Details>
<Summary>Create <code>.gitignore</code>.</Summary>

```bash
echo 'node_modules
dist' >> .gitignore
```

</Details>
