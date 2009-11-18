/**
 * Afrimesh: easy management for B.A.T.M.A.N. wireless mesh networks
 * Copyright (C) 2008-2009 Meraka Institute of the CSIR
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */


#ifndef VILLAGE_BUS_H
#define VILLAGE_BUS_H

#include <stdio.h>

#include <uci.h>
struct uci_context* UCI_CONTEXT; 
#include <json/json.h>

#include <json_cgi.h>
#include <json_rpc.h>

#include <net-snmp/net-snmp-config.h>
#include <net-snmp/net-snmp-includes.h>

#include <village-bus-snmp.h>
#include <village-bus-uci.h>


/**
 * JSON/RPC Dispatch Helpers
 */
struct json_object* jsonrpc_dispatch_snmp(const char* name, struct json_object* arguments);

struct json_object* jsonrpc_dispatch_uci_show(const char* name, struct json_object* arguments);
struct json_object* jsonrpc_dispatch_uci_set (const char* name, struct json_object* arguments);

struct json_object* jsonrpc_dispatch_sys_syslog (const char* name, struct json_object* arguments);
struct json_object* jsonrpc_dispatch_sys_uname  (const char* name, struct json_object* arguments);
struct json_object* jsonrpc_dispatch_sys_version(const char* name, struct json_object* arguments); /* TODO - all components */
struct json_object* jsonrpc_dispatch_sys_upgrade(const char* name, struct json_object* arguments);

struct json_object* jsonrpc_dispatch_ipkg_update (const char* name, struct json_object* arguments);
struct json_object* jsonrpc_dispatch_ipkg_list   (const char* name, struct json_object* arguments); /* TODO - non-standard    */
struct json_object* jsonrpc_dispatch_ipkg_status (const char* name, struct json_object* arguments); /* TODO - deprecate above */
struct json_object* jsonrpc_dispatch_ipkg_upgrade(const char* name, struct json_object* arguments);

#endif /* VILLAGE_BUS_H */
