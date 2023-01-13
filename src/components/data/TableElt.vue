<template>
  <table>
    <caption v-if="hasSlot('title')">
      <slot name="title">
        {{ title }}
      </slot>
    </caption>

    <thead>
      <tr>
        <th
          v-for="(value, key) in items[0]"
          :key="key">
          {{ key === "_id" ? key = "id" : key }}
        </th>
        <th v-if="hasSlot('head')">
          <slot name="head"></slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="index">
        <td
          v-for="(value, key) in item"
          :key="key">
          <slot
            :name="`cell-${key}`"
            :index="index"
            :item="item"
            :key="key"
            :value="value">
            {{ value }}
          </slot>
        </td>
        <td v-if="hasSlot('body')">
          <slot
            name="body"
            :index="index"
            :item="item">
          </slot>
        </td>
      </tr>
    </tbody>

    <tfoot v-if="hasSlot('foot')">
      <slot name="foot"></slot>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: "TableElt",
  props: {
    title: {
      type: String
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    hasSlot(name) {
      return this.$slots[name] !== undefined;
    }
  }
}
</script>

<style scoped>
table {
  --table-box-shadow: 5px 5px 5px 5px var(--silver);

  display: table;
  border-collapse: collapse;
  border-spacing: 10px;
  margin: 20px auto;
  width: auto;
  max-width: 100%;
  font-size: 1rem;
  box-shadow: var(--table-box-shadow);
}

caption {
  caption-side: top;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray);
  text-shadow: 1px 1px 2px;
}

th {
  display: table-column;
  font-size: 1.2rem;
  font-style: italic;
  background-color: var(--blue);
  color: var(--white);
}

th,
td {
  padding: 5px;
  text-align: center;
  vertical-align: middle;
}

td {
  display: table-row;
  word-break: normal;
  cursor: cell;
}

tbody tr:nth-child(even) {
  background-color: var(--silver);
  color: var(--black);
}

tbody tr:nth-child(odd) {
  background-color: var(--white);
  color: var(--gray);
}

tbody tr:hover,
tbody tr:focus {
  background-color: var(--cyan);
  color: var(--navy);
}

@media (min-width: 576px) {
  table {
    max-width: 95%;
  }
}

@media (min-width: 768px) {
  table {
    max-width: 90%;
  }
  th,
  td {
    display: table-cell;
  }
}

@media (min-width: 992px) {
  table {
    max-width: 85%;
  }
}

@media (min-width: 1200px) {
  table {
    max-width: 80%;
  }
}

@media (min-width: 1600px) {
  table {
    max-width: 75%;
  }
}
</style>
