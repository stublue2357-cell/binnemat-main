import React, { useState, useEffect } from 'react';
import { Tag, Button, Select, message, Popconfirm } from 'antd';
import { RefreshCw, MessageSquare, Check, X, ShoppingCart, FileText } from 'lucide-react';
import { fetchAdminOrders, updateOrderStatus } from '../../services/wooAdminService';
import AdminOrderReceiptModal from './AdminOrderReceiptModal';

export default function AdminOrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [receiptOrder, setReceiptOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminOrders(filterStatus === 'all' ? '' : filterStatus);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      message.error(`Failed to load orders: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [filterStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      message.success(`Order #${orderId} marked as ${newStatus}`);
      loadOrders();
    } catch (err) {
      message.error(`Failed to update status: ${err.message}`);
    }
  };

  const getStatusTag = (status) => {
    const map = { processing: { color: 'blue', text: 'Processing' }, completed: { color: 'green', text: 'Completed' }, cancelled: { color: 'red', text: 'Cancelled' }, 'on-hold': { color: 'orange', text: 'On Hold' }, pending: { color: 'gold', text: 'Pending Payment' } };
    const s = map[status] || { color: 'default', text: status };
    return <Tag color={s.color} className="font-bold uppercase text-[10px]">{s.text}</Tag>;
  };

  const getWhatsAppLink = (order) => {
    const phone = order.billing?.phone || '';
    const name = `${order.billing?.first_name || ''} ${order.billing?.last_name || ''}`.trim();
    const text = encodeURIComponent(
      `Salam ${name}! This is Binnemat regarding your Order #${order.id} (Rs. ${Number(order.total).toLocaleString()}). Please confirm delivery availability.`
    );
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div className="space-y-4">
      {/* HEADER & FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <ShoppingCart size={18} />
          </div>
          <div>
            <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Live Customer Orders ({orders.length})
            </h3>
            <span className="text-xs text-neutral-400">Directly synchronized with WooCommerce backend</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-36 h-9"
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'processing', label: 'Processing' },
              { value: 'completed', label: 'Completed' },
              { value: 'on-hold', label: 'On Hold' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
          />
          <Button
            icon={<RefreshCw size={14} className={loading ? 'animate-spin' : ''} />}
            onClick={loadOrders}
            className="rounded-xl h-9 font-bold"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* ORDERS LIST */}
      {orders.length === 0 && !loading ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#18181B] border border-neutral-200 dark:border-neutral-800 text-neutral-400">
          No orders found. Once customers place orders, they appear here live!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel font-black text-base text-neutral-900 dark:text-neutral-100">
                    Order #{o.id}
                  </span>
                  {getStatusTag(o.status)}
                  <span className="text-xs text-neutral-400 font-light">
                    {new Date(o.date_created).toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Total Payable</span>
                  <strong className="text-sm sm:text-base font-cinzel font-bold text-bn-goldDark dark:text-bn-gold">
                    Rs. {Number(o.total || 0).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <strong className="block text-neutral-900 dark:text-neutral-200 mb-0.5">
                    Customer Details:
                  </strong>
                  <span className="block text-neutral-600 dark:text-neutral-300">
                    {o.billing?.first_name} {o.billing?.last_name}
                  </span>
                  <span className="block text-neutral-500 font-mono">
                    {o.billing?.phone}
                  </span>
                  <span className="block text-neutral-400">
                    {o.billing?.city}, Pakistan
                  </span>
                </div>

                <div className="md:col-span-2">
                  <strong className="block text-neutral-900 dark:text-neutral-200 mb-0.5">
                    Delivery Address:
                  </strong>
                  <p className="text-neutral-600 dark:text-neutral-300 m-0 leading-relaxed font-light">
                    {o.billing?.address_1}
                  </p>
                  {o.customer_note && (
                    <p className="text-amber-600 dark:text-amber-400 m-0 mt-1 italic">
                      Note: "{o.customer_note}"
                    </p>
                  )}
                </div>
              </div>

              {/* ITEMS */}
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 text-xs space-y-1">
                <strong className="block text-neutral-500 text-[11px] uppercase tracking-wider mb-1">
                  Ordered Items:
                </strong>
                {o.line_items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-neutral-700 dark:text-neutral-300">
                    <span>{item.name} &times; {item.quantity}</span>
                    <span className="font-semibold">Rs. {Number(item.total).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                <Button
                  size="small"
                  icon={<FileText size={13} />}
                  onClick={() => setReceiptOrder(o)}
                  className="rounded-xl text-xs font-bold"
                >
                  Receipt & Invoice
                </Button>

                {o.billing?.phone && (
                  <Button
                    size="small"
                    href={getWhatsAppLink(o)}
                    target="_blank"
                    icon={<MessageSquare size={13} />}
                    className="rounded-xl text-xs font-bold text-emerald-600 border-emerald-500/30 hover:bg-emerald-50"
                  >
                    Chat ({o.billing?.phone})
                  </Button>
                )}

                {o.status !== 'completed' && (
                  <Button
                    size="small"
                    type="primary"
                    icon={<Check size={13} />}
                    onClick={() => handleStatusChange(o.id, 'completed')}
                    className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 border-none text-white"
                  >
                    Complete
                  </Button>
                )}

                {o.status !== 'processing' && o.status !== 'completed' && (
                  <Button
                    size="small"
                    onClick={() => handleStatusChange(o.id, 'processing')}
                    className="rounded-xl text-xs font-bold"
                  >
                    Process
                  </Button>
                )}

                {o.status !== 'cancelled' && (
                  <Popconfirm
                    title="Cancel Order"
                    description="Cancel this order in WooCommerce?"
                    onConfirm={() => handleStatusChange(o.id, 'cancelled')}
                  >
                    <Button
                      size="small"
                      danger
                      icon={<X size={13} />}
                      className="rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </Button>
                  </Popconfirm>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RECEIPT / INVOICE MODAL */}
      <AdminOrderReceiptModal
        open={Boolean(receiptOrder)}
        order={receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />
    </div>
  );
}
