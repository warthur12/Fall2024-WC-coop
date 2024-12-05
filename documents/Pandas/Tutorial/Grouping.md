# [Grouping](https://pandas.pydata.org/docs/user_guide/10min.html#grouping)
### Grouping in Pandas

In pandas, **grouping** refers to the process of performing group-based data analysis. This process typically involves three steps:
1. **Splitting**: Dividing the data into groups based on specific criteria (e.g., column values).
2. **Applying**: Applying a function independently to each group (e.g., sum, mean, or custom functions).
3. **Combining**: Combining the results of these operations into a single data structure, like a DataFrame.

---

### Grouping Example

Consider the following DataFrame:

```python
df = pd.DataFrame({
    "A": ["foo", "bar", "foo", "bar", "foo", "bar", "foo", "foo"],
    "B": ["one", "one", "two", "three", "two", "two", "one", "three"],
    "C": np.random.randn(8),
    "D": np.random.randn(8),
})
```

This DataFrame looks like:

```
     A      B         C         D
0  foo    one  1.346061 -1.577585
1  bar    one  1.511763  0.396823
2  foo    two  1.627081 -0.105381
3  bar  three -0.990582 -0.532532
4  foo    two -0.441652  1.453749
5  bar    two  1.211526  1.208843
6  foo    one  0.268520 -0.080952
7  foo  three  0.024580 -0.264610
```

---

### Grouping by a Single Column

To group by a single column (e.g., column "A") and apply a function (e.g., `sum`) to certain columns:

```python
df.groupby("A")[["C", "D"]].sum()
```

**Output**:

```
            C         D
A                      
bar  1.732707  1.073134
foo  2.824590 -0.574779
```

Here:
- The data is grouped by column "A" (`foo` and `bar`).
- The `sum()` function is applied to columns "C" and "D".
- The results are aggregated by the group labels in column "A".

---

### Grouping by Multiple Columns (MultiIndex)

When grouping by multiple columns (e.g., "A" and "B"), pandas creates a **MultiIndex**, which is a hierarchical index for more granular grouping.

```python
df.groupby(["A", "B"]).sum()
```

**Output**:

```
                  C         D
A   B                        
bar one    1.511763  0.396823
    three -0.990582 -0.532532
    two    1.211526  1.208843
foo one    1.614581 -1.658537
    three  0.024580 -0.264610
    two    1.185429  1.348368
```

Here, the data is grouped by both "A" and "B". Each unique combination of values from these two columns forms a group. For example:
- `bar-one` has a sum of 1.511763 for column "C" and 0.396823 for column "D".
- `foo-two` has a sum of 1.185429 for column "C" and 1.348368 for column "D".

### Key Points:
- **Single column grouping**: Groups the data by a single label and applies functions on selected columns.
- **Multi-column grouping**: Uses a combination of columns to form more granular groupings, which results in a MultiIndex.
- **Aggregation**: Functions like `sum()`, `mean()`, and more can be applied to each group, allowing for flexible data analysis.

Grouping is a powerful tool for exploratory data analysis, helping you quickly summarize and extract insights based on specific groupings or combinations of columns.