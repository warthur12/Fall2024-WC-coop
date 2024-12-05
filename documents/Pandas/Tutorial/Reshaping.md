# [Reshaping](https://pandas.pydata.org/docs/user_guide/10min.html#reshaping)
### Reshaping in Pandas

Reshaping refers to manipulating the structure of data in pandas to fit specific analytical needs. This process often involves changing the format of rows, columns, and indices to work with hierarchical data, pivot tables, or stacked/unstacked data.

---

### **1. Stack/Unstack**

**Stack** and **Unstack** are powerful methods for reshaping DataFrames, particularly when working with hierarchical indices (MultiIndex). These methods allow for transforming the dimensions of the DataFrame, either “compressing” (stacking) or “expanding” (unstacking) the data.

---

#### Example: Stack
In the following example, the DataFrame `df2` has a **MultiIndex** (`first` and `second` levels). Using the `stack()` method, we "compress" the columns `A` and `B` into a single index level.

```python
arrays = [
    ["bar", "bar", "baz", "baz", "foo", "foo", "qux", "qux"],
    ["one", "two", "one", "two", "one", "two", "one", "two"],
]

index = pd.MultiIndex.from_arrays(arrays, names=["first", "second"])
df = pd.DataFrame(np.random.randn(8, 2), index=index, columns=["A", "B"])

df2 = df[:4]

stacked = df2.stack()
```

**Output:**

```
first  second   
bar    one     A   -0.727965
               B   -0.589346
       two     A    0.339969
               B   -0.693205
baz    one     A   -0.339355
               B    0.593616
       two     A    0.884345
               B    1.591431
dtype: float64
```

- `stack()` compresses the DataFrame by turning columns `A` and `B` into additional rows.
- The result is a Series with a **MultiIndex**, where each entry in the original columns becomes part of the index.

---

#### Example: Unstack
The inverse of stacking is **unstacking**, which moves an index level into columns.

```python
stacked.unstack()
```

**Output:**

```
                     A         B
first second                    
bar   one    -0.727965 -0.589346
      two     0.339969 -0.693205
baz   one    -0.339355  0.593616
      two     0.884345  1.591431
```

- Here, the `unstack()` method moves the last index level (in this case, `second`) back to the columns.
- The result is similar to the original `df2` DataFrame before stacking.

You can also unstack other index levels by specifying which level to unstack:

```python
stacked.unstack(1)  # Unstacking the "second" index level
```

**Output:**

```
second        one       two
first                      
bar   A -0.727965  0.339969
      B -0.589346 -0.693205
baz   A -0.339355  0.884345
      B  0.593616  1.591431
```

---

### **2. Pivot Tables**

Pivot tables are a powerful tool for reshaping and summarizing data. They allow you to transform data by specifying columns as **index**, **columns**, and **values** to create a summary table.

#### Example: Creating a Pivot Table
The following DataFrame contains categorical data in columns `A`, `B`, and `C`, and numerical data in columns `D` and `E`:

```python
df = pd.DataFrame({
    "A": ["one", "one", "two", "three"] * 3,
    "B": ["A", "B", "C"] * 4,
    "C": ["foo", "foo", "foo", "bar", "bar", "bar"] * 2,
    "D": np.random.randn(12),
    "E": np.random.randn(12),
})

"""
        A  B    C         D         E
0     one  A  foo -1.202872  0.047609
1     one  B  foo -1.814470 -0.136473
2     two  C  foo  1.018601 -0.561757
3   three  A  bar -0.595447 -1.623033
4     one  B  bar  1.395433  0.029399
5     one  C  bar -0.392670 -0.542108
6     two  A  foo  0.007207  0.282696
7   three  B  foo  1.928123 -0.087302
8     one  C  foo -0.055224 -1.575170
9     one  A  bar  2.395985  1.771208
10    two  B  bar  1.552825  0.816482
11  three  C  bar  0.166599  1.100230
"""

pd.pivot_table(df, values="D", index=["A", "B"], columns=["C"])
```

**Output:**

```
C             bar       foo
A     B                    
one   A  2.395985 -1.202872
      B  1.395433 -1.814470
      C -0.392670 -0.055224
three A -0.595447       NaN
      B       NaN  1.928123
      C  0.166599       NaN
two   A       NaN  0.007207
      B  1.552825       NaN
      C       NaN  1.018601
```

Here’s what each part of the `pivot_table()` function does:
- **`values`**: The data to be aggregated. In this case, column `"D"`.
- **`index`**: Rows in the output pivot table (e.g., columns `"A"` and `"B"`).
- **`columns`**: Columns in the output pivot table (e.g., column `"C"`).

> [!note] 
> In this example you can see where the data had moved by noting similar rows and columns in the previous table and then looking for them in the new one.
> For example:
> * The first line of the original table looks like `one  A  foo -1.202872  0.047609`
> * You can follow the same columns to find how that data had been "pivoted" in the new tables: `x = one, A; y = foo` which we can see is `-1.202872`
> * Another example: `one  C  bar -0.392670 -0.542108` => `x = one, C; y = bar` which equals `-0.392670`
> * Keep in mind that because `values` has been set to `"D"` we are only working with the numerical values in the original `"D"` column

---

### **Extra Explanation: Pivot Tables**

**What is a Pivot Table?**
- A pivot table is a way to summarize and reorganize data in a DataFrame.
- It allows you to aggregate data based on one or more categorical fields, then apply summary functions (e.g., sum, mean) to numerical fields.
- Pivot tables are widely used for data exploration and reporting.

**Terminology:**
- **Values**: These are the data you want to summarize (e.g., numerical data like sums or averages).
- **Index**: These form the rows of the pivot table, allowing grouping by specific fields.
- **Columns**: These determine the columns of the pivot table, organizing the data in a cross-tabulated format.

---

### **Additional Uses of Pivot Tables:**
- **Aggregation Functions**: You can specify different aggregation functions like `mean`, `sum`, `min`, `max`, etc., by passing the `aggfunc` parameter.
  ```python
  pd.pivot_table(df, values="D", index=["A", "B"], columns=["C"], aggfunc="mean")
  ```
  
- **Handling Missing Data**: You can handle missing data by using the `fill_value` parameter.
  ```python
  pd.pivot_table(df, values="D", index=["A", "B"], columns=["C"], fill_value=0)
  ```

- **Multiple Values**: You can summarize multiple columns in a pivot table by passing a list to `values`.
  ```python
  pd.pivot_table(df, values=["D", "E"], index=["A", "B"], columns=["C"])
  ```

Pivot tables allow for flexibility and customization in analyzing your data, making them a versatile tool in data processing and exploration.