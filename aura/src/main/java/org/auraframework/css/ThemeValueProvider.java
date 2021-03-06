/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.auraframework.css;

import java.util.Set;

import org.auraframework.def.ThemeDescriptorProvider;
import org.auraframework.expression.PropertyReference;
import org.auraframework.instance.ValueProvider;
import org.auraframework.system.Location;
import org.auraframework.throwable.quickfix.QuickFixException;

/**
 * Responsible for evaluating a theme expression to the string value. The expression may contain multiple references to
 * theme variables, as well as valid aura expression syntax.
 * <p>
 * This is <em>not</em> to be confused with theme providers! ({@link ThemeDescriptorProvider}).
 */
public interface ThemeValueProvider extends ValueProvider {
    /**
     * Use this to resolve an expression from a String.
     *
     * @param expression The expression to evaluate.
     * @param location The location of the expression in the source.
     *
     * @return The value, same as from {@link #getValue(PropertyReference)}
     *
     * @throws QuickFixException A number of reasons, including an invalid ThemeDef.
     */
    Object getValue(String expression, Location location) throws QuickFixException;

    /**
     * Extracts the set of var names referenced in the given string expression.
     *
     * @param expression The string containing references to vars (and potentially other literals).
     * @param followCrossReferences If true, this will include any cross referenced var names. For example, with
     *            {@code var1='A'} and {@code var2=var1}, for the expression "var2", if this param is specified as true
     *            then this method will return {@code var2} and {@code var1}.
     * @return The names of referenced vars.
     * @throws QuickFixException A number of reasons, including an invalid ThemeDef.
     */
    Set<String> extractVarNames(String expression, boolean followCrossReferences) throws QuickFixException;

    /**
     * Gets the specified indication of how this theme value provider is planned to be used.
     * <p>
     * Note that this is merely an <em>indication</em> and doesn't necessarily dictate how this provider itself will
     * behave (but other classes utilizing this provider may make decisions based on what this method returns).
     */
    ResolveStrategy getResolveStrategy();
}
