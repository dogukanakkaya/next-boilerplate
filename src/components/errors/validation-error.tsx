import { TRPCClientErrorLike } from '@trpc/client';
import { AppRouter } from '@server/routers/app';

export default function ValidationError({ field, error }: Props) {
    return (
        error?.data?.validationError?.fieldErrors?.[field] ? (
            <small className="text-red-500">{error.data.validationError.fieldErrors[field]?.[0]}</small>
        ) : null
    );
}

interface Props {
    field: string;
    error: TRPCClientErrorLike<AppRouter> | null;
}
