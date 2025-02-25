import type { Address } from "viem"
import type { SimulateHandleOpResult } from "../rpc/estimation/types"
import type { ReferencedCodeHashes } from "./mempool"
import type {
    StateOverrides,
    UserOperation,
    UserOperationV06,
    UserOperationV07
} from "./schemas"
import type * as validation from "./validation"

export interface InterfaceValidator {
    getExecutionResult(args: {
        userOperation: UserOperation
        entryPoint: Address
        queuedUserOperations: UserOperation[]
        addSenderDepositOverride: boolean
        stateOverrides?: StateOverrides
    }): Promise<SimulateHandleOpResult<"execution">>

    getValidationResultV06(args: {
        userOperation: UserOperationV06
        entryPoint: Address
        codeHashes?: ReferencedCodeHashes
    }): Promise<
        (
            | validation.ValidationResult
            | validation.ValidationResultWithAggregation
        ) & {
            storageMap: validation.StorageMap
            referencedContracts?: ReferencedCodeHashes
        }
    >

    getValidationResultV07(args: {
        userOperation: UserOperationV07
        queuedUserOperations: UserOperation[]
        entryPoint: Address
        codeHashes?: ReferencedCodeHashes
    }): Promise<
        (
            | validation.ValidationResult
            | validation.ValidationResultWithAggregation
        ) & {
            storageMap: validation.StorageMap
            referencedContracts?: ReferencedCodeHashes
        }
    >

    getValidationResult(args: {
        userOperation: UserOperation
        queuedUserOperations: UserOperation[]
        entryPoint: Address
        codeHashes?: ReferencedCodeHashes
    }): Promise<
        (
            | validation.ValidationResult
            | validation.ValidationResultWithAggregation
        ) & {
            storageMap: validation.StorageMap
            referencedContracts?: ReferencedCodeHashes
        }
    >

    validatePreVerificationGas(args: {
        userOperation: UserOperation
        entryPoint: Address
    }): Promise<void>

    validateUserOperation(args: {
        shouldCheckPrefund: boolean
        userOperation: UserOperation
        queuedUserOperations: UserOperation[]
        entryPoint: Address
        referencedContracts?: ReferencedCodeHashes
    }): Promise<
        (
            | validation.ValidationResult
            | validation.ValidationResultWithAggregation
        ) & {
            storageMap: validation.StorageMap
            referencedContracts?: ReferencedCodeHashes
        }
    >
}
