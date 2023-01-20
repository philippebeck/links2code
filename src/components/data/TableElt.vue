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
  --table-display: table;
  --table-overflow: hidden;
  --table-margin: 50px auto;
  --table-border-collapse: collapse;
  --table-border-radius: 10px;
  --table-width: auto;
  --table-max-width: 100%;
  --table-font-size: 1.2rem;

  display: var(--table-display);
  overflow: var(--table-overflow);
  margin: var(--table-margin);
  border-collapse: var(--table-border-collapse);
  border-radius: var(--table-border-radius);
  width: var(--table-width);
  max-width: var(--table-max-width);
  font-size: var(--table-font-size);
}

caption {
  --caption-caption-side: top;
  --caption-margin-bottom: 20px;
  --caption-font-size: 1.5rem;
  --caption-font-weight: bold;
  --caption-color: var(--gray);
  --caption-text-shadow: 1px 1px 2px;

  caption-side: var(--caption-caption-side);
  margin-bottom: var(--caption-margin-bottom);
  font-size: var(--caption-font-size);
  font-weight: var(--caption-font-weight);
  color: var(--caption-color);
  text-shadow: var(--caption-text-shadow);
}

th {
  --th-display: table-column;
  --th-font-size: 1.5rem;
  --th-font-style: italic;
  --th-text-transform: uppercase;
  --th-background-color: var(--blue);
  --th-color: var(--white);

  display: var(--th-display);
  font-size: var(--th-font-size);
  font-style: var(--th-font-style);
  text-transform: var(--th-text-transform);
  background-color: var(--th-background-color);
  color: var(--th-color);
}

th,
td {
  --th-td-padding: 5px;
  --th-td-text-align: center;
  --th-td-vertical-align: middle;

  padding: var(--th-td-padding);
  text-align: var(--th-td-text-align);
  vertical-align: var(--th-td-vertical-align);
}

td {
  --td-display: table-row;
  --td-word-break: normal;
  --td-cursor: cell;

  display: var(--td-display);
  word-break: var(--td-word-break);;
  cursor: var(--td-cursor);
}

tbody tr:nth-child(even) {
  --tbody-even-background-color: var(--gray-light);
  --tbody-even-color: var(--black);

  background-color: var(--btbody-even-background-color);
  color: var(--btbody-even-background-color);
}

tbody tr:nth-child(odd) {
  --tbody-odd-background-color: var(--white);
  --tbody-odd-color: var(--gray);

  background-color: var(--tbody-odd-background-color);
  color: var(--tbody-odd-color);
}

tbody tr:hover,
tbody tr:focus {
  --tbody-hover-background-color: var(--silver);
  --tbody-hover-color: var(--black);

  background-color: var(--tbody-hover-background-color);
  color: var(--tbody-hover-color);
}

@media (min-width: 576px) {
  table {
    --table-max-width:: 95%;
  }
}

@media (min-width: 768px) {
  table {
    --table-max-width: 90%;
  }
}

@media (min-width: 992px) {
  table {
    --table-max-width: 85%;
  }
  th,
  td {
    --th-td-display: table-cell;
    display: var(--th-td-display);
  }
}

@media (min-width: 1200px) {
  table {
    --table-max-width: 80%;
  }
}

@media (min-width: 1600px) {
  table {
    --table-max-width: 75%;
  }
}
</style>
