import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 1,
      categoryName: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, widgetName: 'Widget 1', widgetText: 'This is random text for Widget 1.' },
        { id: 2, widgetName: 'Widget 2', widgetText: 'This is random text for Widget 2.' },
      ],
    },
    {
      id: 2,
      categoryName: 'CWPP Dashboard',
      widgets: [{ id: 1, widgetName: 'Widget A', widgetText: 'This is random text for Widget A.' }, 
        { id: 2, widgetName: 'Widget A', widgetText: 'This is random text for Widget B.' }
      ],
    
    },
    { id: 3, categoryName: 'Registry Scan', widgets: [{ id: 1, widgetName: 'Widget Y', widgetText: 'This is random text for Widget Y.' },
          { id: 2, widgetName: 'Widget Z', widgetText: 'This is random text for Widget Z.' }
    ] },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addWidget(state, action) {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    setDashboardData(state, action) {
      state.categories = action.payload; // Update categories with the new data
    },
  },
});

export const { addWidget, removeWidget, setDashboardData } = categoriesSlice.actions;
export default categoriesSlice.reducer;
