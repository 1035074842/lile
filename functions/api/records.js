export async function onRequestGet(context) {
    const { env } = context;
    
    try {
        const existingRecords = await env.KV_STORAGE.get('checkin_records');
        const records = existingRecords ? JSON.parse(existingRecords) : [];
        
        return new Response(JSON.stringify({
            success: true,
            data: records
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        console.error('获取记录错误:', error);
        return new Response(JSON.stringify({
            success: false,
            msg: '获取记录失败'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function onRequestOptions(context) {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}