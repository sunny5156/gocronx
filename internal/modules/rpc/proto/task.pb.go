// Code generated by protoc-gen-go. DO NOT EDIT.
// source: task.proto

/*
Package rpc is a generated protocol buffer package.

It is generated from these files:
	task.proto

It has these top-level messages:
	TaskRequest
	TaskResponse
*/
package rpc

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type TaskRequest struct {
	Command string `protobuf:"bytes,2,opt,name=command" json:"command,omitempty"`
	Timeout int32  `protobuf:"varint,3,opt,name=timeout" json:"timeout,omitempty"`
	Id      int64  `protobuf:"varint,4,opt,name=id" json:"id,omitempty"`
}

func (m *TaskRequest) Reset()                    { *m = TaskRequest{} }
func (m *TaskRequest) String() string            { return proto.CompactTextString(m) }
func (*TaskRequest) ProtoMessage()               {}
func (*TaskRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *TaskRequest) GetCommand() string {
	if m != nil {
		return m.Command
	}
	return ""
}

func (m *TaskRequest) GetTimeout() int32 {
	if m != nil {
		return m.Timeout
	}
	return 0
}

func (m *TaskRequest) GetId() int64 {
	if m != nil {
		return m.Id
	}
	return 0
}

type TaskResponse struct {
	Output string `protobuf:"bytes,1,opt,name=output" json:"output,omitempty"`
	Error  string `protobuf:"bytes,2,opt,name=error" json:"error,omitempty"`
}

func (m *TaskResponse) Reset()                    { *m = TaskResponse{} }
func (m *TaskResponse) String() string            { return proto.CompactTextString(m) }
func (*TaskResponse) ProtoMessage()               {}
func (*TaskResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *TaskResponse) GetOutput() string {
	if m != nil {
		return m.Output
	}
	return ""
}

func (m *TaskResponse) GetError() string {
	if m != nil {
		return m.Error
	}
	return ""
}

func init() {
	proto.RegisterType((*TaskRequest)(nil), "rpc.TaskRequest")
	proto.RegisterType((*TaskResponse)(nil), "rpc.TaskResponse")
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// Client API for Task service

type TaskClient interface {
	Run(ctx context.Context, in *TaskRequest, opts ...grpc.CallOption) (*TaskResponse, error)
}

type taskClient struct {
	cc *grpc.ClientConn
}

func NewTaskClient(cc *grpc.ClientConn) TaskClient {
	return &taskClient{cc}
}

func (c *taskClient) Run(ctx context.Context, in *TaskRequest, opts ...grpc.CallOption) (*TaskResponse, error) {
	out := new(TaskResponse)
	err := grpc.Invoke(ctx, "/rpc.Task/Run", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for Task service

type TaskServer interface {
	Run(context.Context, *TaskRequest) (*TaskResponse, error)
}

func RegisterTaskServer(s *grpc.Server, srv TaskServer) {
	s.RegisterService(&_Task_serviceDesc, srv)
}

func _Task_Run_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TaskRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TaskServer).Run(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/rpc.Task/Run",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TaskServer).Run(ctx, req.(*TaskRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Task_serviceDesc = grpc.ServiceDesc{
	ServiceName: "rpc.Task",
	HandlerType: (*TaskServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Run",
			Handler:    _Task_Run_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "task.proto",
}

func init() { proto.RegisterFile("task.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 184 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x4c, 0x8f, 0xcf, 0x8a, 0x83, 0x30,
	0x10, 0xc6, 0x37, 0x46, 0x5d, 0x76, 0x76, 0x59, 0xda, 0xa1, 0x94, 0xd0, 0x93, 0x78, 0xf2, 0x50,
	0x3c, 0xb4, 0x3d, 0xf6, 0x25, 0x1a, 0xfa, 0x02, 0x56, 0x73, 0x10, 0xd1, 0x49, 0x93, 0xc9, 0xfb,
	0x17, 0xff, 0x81, 0xc7, 0xdf, 0x0c, 0xf3, 0xfd, 0xe6, 0x03, 0xe0, 0xca, 0x77, 0xa5, 0x75, 0xc4,
	0x84, 0xd2, 0xd9, 0x3a, 0x7f, 0xc0, 0xef, 0xb3, 0xf2, 0x9d, 0x36, 0xef, 0x60, 0x3c, 0xa3, 0x82,
	0xef, 0x9a, 0xfa, 0xbe, 0x1a, 0x1a, 0x15, 0x65, 0xa2, 0xf8, 0xd1, 0x2b, 0x8e, 0x1b, 0x6e, 0x7b,
	0x43, 0x81, 0x95, 0xcc, 0x44, 0x91, 0xe8, 0x15, 0xf1, 0x1f, 0xa2, 0xb6, 0x51, 0x71, 0x26, 0x0a,
	0xa9, 0xa3, 0xb6, 0xc9, 0xef, 0xf0, 0x37, 0x47, 0x7a, 0x4b, 0x83, 0x37, 0x78, 0x84, 0x94, 0x02,
	0xdb, 0xc0, 0x4a, 0x4c, 0x91, 0x0b, 0xe1, 0x01, 0x12, 0xe3, 0x1c, 0xb9, 0xc5, 0x34, 0xc3, 0xe5,
	0x06, 0xf1, 0x78, 0x8d, 0x67, 0x90, 0x3a, 0x0c, 0xb8, 0x2b, 0x9d, 0xad, 0xcb, 0xcd, 0x8b, 0xa7,
	0xfd, 0x66, 0x32, 0x1b, 0xf2, 0xaf, 0x57, 0x3a, 0x55, 0xba, 0x7e, 0x02, 0x00, 0x00, 0xff, 0xff,
	0xd7, 0x7f, 0x8a, 0x9d, 0xe0, 0x00, 0x00, 0x00,
}
