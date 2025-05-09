import React, { useState } from 'react';
import './ExpenseCategories.css';

export interface ExpenseCategory {
  id: string;
  type: string;
  name: string;
  supplier: string;
  cost: string;
  paymentDay: string;
  paymentMethod: string;
  bank?: string;
}

interface Props {
  categories: ExpenseCategory[];
}

const ExpenseCategories: React.FC<Props> = ({ categories }) => {
  const [sortBy, setSortBy] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(true);
    }
  };

  const getSortedCategories = () => {
    if (!sortBy) return categories;
    const sorted = [...categories].sort((a, b) => {
      if (sortBy === 'cost') {
        const costA = parseFloat(a.cost.replace('£', ''));
        const costB = parseFloat(b.cost.replace('£', ''));
        return sortAsc ? costA - costB : costB - costA;
      }
      if (sortBy === 'paymentDay') {
        const dayA = parseInt(a.paymentDay, 10);
        const dayB = parseInt(b.paymentDay, 10);
        return sortAsc ? dayA - dayB : dayB - dayA;
      }
      if (sortBy === 'name' || sortBy === 'supplier' || sortBy === 'paymentMethod' || sortBy === 'type' || sortBy === 'bank') {
        return sortAsc
          ? (a[sortBy] ?? '').localeCompare(b[sortBy] ?? '')
          : (b[sortBy] ?? '').localeCompare(a[sortBy] ?? '');
      }
      return 0;
    });
    return sorted;
  };

  return (
    <table>
      <thead>
        <tr>
          <th
            className="sortable-column"
            onClick={() => handleSort('type')}
            title="Click to sort by type"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('type'); }}
            aria-label={`Sort by type ${sortBy === 'type' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
          >
            Type
            <span
              aria-hidden="true"
              className={`sort-arrow${sortBy === 'type' ? ' visible' : ''}`}
            >
              {sortAsc ? '▲' : '▼'}
            </span>
          </th>
          <th
            className="sortable-column"
            onClick={() => handleSort('name')}
            title="Click to sort by category"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('name'); }}
            aria-label={`Sort by category ${sortBy === 'name' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
          >
            Name
            <span
              aria-hidden="true"
              className={`sort-arrow${sortBy === 'name' ? ' visible' : ''}`}
            >
              {sortAsc ? '▲' : '▼'}
            </span>
          </th>
          <th
            className="sortable-column"
            onClick={() => handleSort('supplier')}
            title="Click to sort by supplier"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('supplier'); }}
            aria-label={`Sort by supplier ${sortBy === 'supplier' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
          >
            Supplier
            <span
              aria-hidden="true"
              className={`sort-arrow${sortBy === 'supplier' ? ' visible' : ''}`}
            >
              {sortAsc ? '▲' : '▼'}
            </span>
          </th>
          <th
            className="sortable-column"
            onClick={() => handleSort('cost')}
            title="Click to sort by cost"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('cost'); }}
            aria-label={`Sort by cost ${sortBy === 'cost' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
          >
            Cost
            <span
              aria-hidden="true"
              className={`sort-arrow${sortBy === 'cost' ? ' visible' : ''}`}
            >
              {sortAsc ? '▲' : '▼'}
            </span>
          </th>
          <th
            className="sortable-column"
            onClick={() => handleSort('paymentDay')}
            title="Click to sort by payment day"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('paymentDay'); }}
            aria-label={`Sort by payment day ${sortBy === 'paymentDay' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
          >
            Payment Day
            <span
              aria-hidden="true"
              className={`sort-arrow${sortBy === 'paymentDay' ? ' visible' : ''}`}
            >
              {sortAsc ? '▲' : '▼'}
            </span>
          </th>
          <th
            className="sortable-column"
            onClick={() => handleSort('paymentMethod')}
            title="Click to sort by payment method"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('paymentMethod'); }}
            aria-label={`Sort by payment method ${sortBy === 'paymentMethod' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
          >
            Payment Method
            <span
              aria-hidden="true"
              className={`sort-arrow${sortBy === 'paymentMethod' ? ' visible' : ''}`}
            >
              {sortAsc ? '▲' : '▼'}
            </span>
          </th>
          <th
            className="sortable-column"
            onClick={() => handleSort('bank')}
            title="Click to sort by bank"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('bank'); }}
            aria-label={`Sort by bank ${sortBy === 'bank' ? (sortAsc ? 'descending' : 'ascending') : ''}`}
          >
            Bank
            <span
              aria-hidden="true"
              className={`sort-arrow${sortBy === 'bank' ? ' visible' : ''}`}
            >
              {sortAsc ? '▲' : '▼'}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {getSortedCategories().map((cat) => (
          <tr key={cat.id} data-testid={`expense-row-${cat.id}`}>
            <td>{cat.type}</td>
            <td>{cat.name}</td>
            <td>{cat.supplier}</td>
            <td>{cat.cost}</td>
            <td>{cat.paymentDay}</td>
            <td>{cat.paymentMethod}</td>
            <td>{cat.bank}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseCategories;