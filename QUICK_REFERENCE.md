# Quick Reference Guide - New Features

## Toast Notifications

### Import and Setup
```tsx
import { useToast } from '@/hooks/useToast';

const { success, error, info, warning, ToastContainer } = useToast();

// In JSX
return (
  <>
    {/* Your content */}
    <ToastContainer />
  </>
);
```

### Usage Examples
```tsx
// Success notification
success('Product created successfully!');

// Error notification
error('Failed to save changes');

// Info notification
info('Loading data...');

// Warning notification
warning('Low stock detected');
```

---

## Skeleton Loaders

### Import
```tsx
import { 
  TableSkeleton, 
  CardSkeleton, 
  ProductCardSkeleton, 
  ChartSkeleton,
  StatsGridSkeleton 
} from '@/components/Skeletons';
```

### Usage Examples
```tsx
// While loading data
if (loading) {
  return (
    <div className="p-6 space-y-6">
      <StatsGridSkeleton count={4} />
      <TableSkeleton rows={5} />
      <ChartSkeleton height={300} />
    </div>
  );
}
```

---

## Empty States

### Import
```tsx
import EmptyState, { 
  EmptyProducts, 
  EmptyCategories, 
  EmptyOrders,
  EmptySearch 
} from '@/components/EmptyState';
```

### Usage Examples
```tsx
// Pre-built components
{products.length === 0 && <EmptyProducts />}
{categories.length === 0 && <EmptyCategories />}
{orders.length === 0 && <EmptyOrders />}
{searchResults.length === 0 && <EmptySearch searchQuery="laptop" />}

// Custom empty state
<EmptyState
  title="No Items Found"
  description="Try adjusting your filters"
  icon={
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M..." />
    </svg>
  }
  actionLabel="Clear Filters"
  onAction={() => resetFilters()}
/>
```

---

## Validation Utilities

### Import
```tsx
import { validateProduct, validateCategory, validateOrder } from '@/lib/validation';
```

### Usage in API Routes
```tsx
// In API route
const validationErrors = validateProduct({
  name: formData.get('name'),
  price: parseFloat(formData.get('price')),
  stock: parseInt(formData.get('stock')),
  categoryId: formData.get('categoryId'),
});

if (validationErrors.length > 0) {
  return NextResponse.json(
    { error: 'Validation failed', errors: validationErrors },
    { status: 400 }
  );
}
```

### Handling Errors in Frontend
```tsx
const response = await fetch('/api/products', {
  method: 'POST',
  body: formData,
});

const data = await response.json();

if (!response.ok) {
  if (data.errors) {
    // Field-level errors
    const messages = data.errors.map(e => e.message).join(', ');
    showError(messages);
  } else {
    // General error
    showError(data.error);
  }
}
```

---

## Animation Classes

### Available Classes
```css
/* Slide in from right (for toasts) */
.animate-slide-in

/* Subtle pulsing (for skeletons) */
.animate-pulse-subtle
```

### Usage
```tsx
<div className="animate-slide-in">
  Notification
</div>

<div className="animate-pulse-subtle bg-gray-200 h-4 rounded" />
```

---

## Button States

### Loading State Example
```tsx
<button
  disabled={loading}
  className="px-6 py-2 bg-primary text-white rounded-lg 
             hover:bg-secondary transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Saving...' : 'Save'}
</button>
```

### Hover Effects
```tsx
// Scale on hover
className="hover:scale-105 active:scale-95 transition-all duration-200"

// Shadow on hover
className="hover:shadow-md transition-shadow"

// Color change
className="hover:bg-secondary transition-colors duration-200"
```

---

## Validation Rules Reference

### Products
- **Name**: 3-100 characters, required
- **Price**: > 0 and < 1,000,000, required
- **Stock**: >= 0, defaults to 0
- **Category**: Required
- **Image**: Required for new products

### Categories
- **Name**: 2-50 characters, required
- **Description**: < 500 characters, optional

### Orders
- **Customer Name**: Required
- **Customer Email**: Valid email format, required
- **Products**: Non-empty array with productId and quantity
- **Total Amount**: >= 0, required

### Users
- **Name**: >= 2 characters, required
- **Email**: Valid format, required
- **Password**: >= 6 characters, required

---

## Best Practices

### Toast Notifications
✅ Use success for completed actions  
✅ Use error for failures  
✅ Use warning for important notices  
✅ Use info for general messages  
✅ Keep messages concise (< 50 characters)  

### Skeleton Loaders
✅ Match skeleton structure to actual content  
✅ Use during initial data fetch  
✅ Replace entire content area, not just spinner  
✅ Set appropriate row/item counts  

### Empty States
✅ Provide clear explanation  
✅ Offer actionable next steps  
✅ Use relevant icons  
✅ Keep descriptions helpful but brief  

### Validation
✅ Validate on backend (security)  
✅ Validate on frontend (UX)  
✅ Show specific field errors  
✅ Disable submit during processing  

---

## Common Patterns

### Data Fetching with Loading & Empty States
```tsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const { ToastContainer, error } = useToast();

useEffect(() => {
  fetchData();
}, []);

if (loading) {
  return <TableSkeleton rows={5} />;
}

if (data.length === 0) {
  return <EmptyProducts />;
}

return (
  <>
    <DataTable data={data} />
    <ToastContainer />
  </>
);
```

### Form Submission with Validation & Toast
```tsx
const [loading, setLoading] = useState(false);
const { success, error } = useToast();

const handleSubmit = async (formData) => {
  setLoading(true);
  try {
    const response = await fetch('/api/resource', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        error(data.errors.map(e => e.message).join(', '));
      } else {
        error(data.error);
      }
      return;
    }
    
    success('Created successfully!');
    onClose();
  } catch (err) {
    error('An error occurred');
  } finally {
    setLoading(false);
  }
};
```

---

## Troubleshooting

### Toast not appearing
- Check if `<ToastContainer />` is rendered
- Verify hook is called inside component
- Ensure messages are being triggered

### Skeleton not showing
- Verify loading state is true initially
- Check component import path
- Ensure skeleton is returned before data

### Validation errors not displaying
- Check API response format matches expected structure
- Verify error handling in frontend
- Console.log response to debug

### Animations not working
- Check globals.css is imported
- Verify class names match definitions
- Clear browser cache if needed
