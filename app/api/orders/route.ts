import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const customerName = formData.get('customerName') as string;
    const customerPhone = formData.get('customerPhone') as string;
    const customerEmail = formData.get('customerEmail') as string || '';
    const deliveryAddress = formData.get('deliveryAddress') as string;
    const deliveryDate = formData.get('deliveryDate') as string;
    const notes = formData.get('notes') as string || '';
    const orderItemsJson = formData.get('orderItems') as string;
    const paymentProofFile = formData.get('paymentProof') as File;

    if (!customerName || !customerPhone || !deliveryAddress || !deliveryDate || !orderItemsJson) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let paymentProofUrl = '';

    // Save payment proof image
    if (paymentProofFile && paymentProofFile.size > 0) {
      const bytes = await paymentProofFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const filename = `payment_${timestamp}_${paymentProofFile.name}`;

      // Ensure uploads directory exists
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (e) {
        // Directory might already exist
      }

      const filepath = join(uploadsDir, filename);

      try {
        await writeFile(filepath, buffer);
        paymentProofUrl = `/uploads/${filename}`;
      } catch (error) {
        console.error('Error saving file:', error);
      }
    }

    const orderItems = JSON.parse(orderItemsJson);

    // Calculate total (simplified - in production you'd have actual pricing)
    const totalAmount = orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0) * 10; // Example pricing

    // Create order in database
    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress,
        deliveryDate: new Date(deliveryDate),
        totalAmount,
        paymentProof: paymentProofUrl,
        status: 'pending',
        notes,
        orderItems: {
          create: orderItems.map((item: any) => ({
            menuItemId: item.name, // Simplified - in production use actual menu item IDs
            quantity: item.quantity,
            price: 10, // Example pricing
          }))
        }
      },
      include: {
        orderItems: true
      }
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Order received successfully'
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Error processing order', details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}
